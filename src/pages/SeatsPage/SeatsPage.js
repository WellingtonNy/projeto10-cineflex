import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";



export default function SeatsPage(props) {

    const { idSessao } = useParams();
    const [assento, setAssento] = useState(null);
    const [escolha, setEscolha] = useState([]);
    const [nome, setNome] = useState();
    const [cpf, setCpf] = useState();
    const navigate = useNavigate();




    useEffect(() => {
        const requisicao = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`);

        requisicao.then(resposta => {
            setAssento(resposta.data);
        });

        requisicao.catch(resposta => {
            console.log(resposta.request.status);
        });

    }, []);

    if (assento === null) {
        return (
            <Loading>
                <img src="/assets/loading.gif"></img>
            </Loading>
        );
    }

    function escolher(cadeira) {
        if (cadeira.isAvailable !== true) {
            return alert("Esse assento não está disponível");
        }

        let escolhaCadeira = [...escolha];

        if (escolhaCadeira.includes(cadeira)) {
            escolhaCadeira = escolhaCadeira.filter((elemento) => elemento !== cadeira);
        } else {
            escolhaCadeira.push(cadeira);
        }
        setEscolha(escolhaCadeira);
    }

    function submeter() {

        const arr = [...escolha];
        const arr2 = [];
        const arr3 = [];
        arr.forEach((e) => arr3.push((e.name)));
        arr.forEach((e) => arr2.push((e.id)));
        const corpo = { ids: arr2, name: nome, cpf};
        const postar = axios.post('https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many', corpo);

        postar.then(() => {
            props.setDados({
                nome,
                cpf,
                cadeira: arr3,
                filme: assento.movie.title,
                data: assento.day.date,
                hora: assento.name
            });
        });

        postar.catch(() => console.log('erro'));

        navigate('/sucesso');

    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {assento.seats.map((elemento) => {
                    return (

                        <SeatItem
                            data-test="seat"
                            key={elemento.id}
                            vago={elemento.isAvailable}
                            selecionado={escolha.includes(elemento)}
                            onClick={() => escolher(elemento)}
                        >{elemento.name}</SeatItem>

                    );
                })};

            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle vago={true} selecionado={true} />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle vago={true} selecionado={false} />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle vago={false} selecionado={false} />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                <form onSubmit={submeter}>

                    <label htmlFor="nome" >Nome do Comprador:</label>
                    <input data-test="client-name"
                        id="nome"
                        type="text"
                        required
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                        placeholder="Digite seu nome..." />

                    <label htmlFor="cpf" >CPF do Comprador:</label>
                    <input data-test="client-cpf"
                        id="cpf"
                        type="text"
                        required
                        value={cpf}
                        onChange={e => setCpf(e.target.value)}
                        placeholder="Digite seu CPF sem Pontos ou Traços..." />

                    <button data-test="book-seat-btn" type="submit">Reservar Assento(s)</button>

                </form>
            </FormContainer>

            <FooterContainer data-test="footer">
                <div>
                    <img src={assento.movie.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{assento.movie.title}</p>
                    <p>{assento.day.weekday} - {assento.name}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    );
}



const Loading = styled.div`
width: 100vw;
height: 100vh;
margin: 0 auto;
display: flex;
justify-content: center;
align-items: center;
img{
    width: 17%; 
}
`;

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`;
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`;
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`;
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`;
const CaptionCircle = styled.div`
    border: 1px solid ${(props) => (!props.vago) ? '#F7C52B' : (props.selecionado ? '#0E7D71' : '#808F9D')};
    background-color: ${(props) => (!props.vago) ? '#FBE192' : (props.selecionado ? '#1AAE9E' : '#C3CFD9')};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`;
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`;
const SeatItem = styled.div`
    border: 1px solid ${(props) => (!props.vago) ? '#F7C52B' : (props.selecionado ? '#0E7D71' : '#808F9D')};
    background-color: ${(props) => (!props.vago) ? '#FBE192' : (props.selecionado ? '#1AAE9E' : '#C3CFD9')};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`;
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`;