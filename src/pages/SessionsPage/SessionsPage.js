import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";


export default function SessionsPage() {

    const { idFilme } = useParams();
    const [sessao, setSessao] = useState(null);


    useEffect(() => {
        const requisicao = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}/showtimes`);

        requisicao.then(resposta => {
            setSessao(resposta.data);
        });

        requisicao.catch(resposta => {
            console.log(resposta.request.status);
        });

    }, []);

    if (sessao === null) {
        return (
            <Loading>
                <img src="/assets/loading.gif"></img>
            </Loading>
        );
    }



    return (
        <PageContainer>
            Selecione o horário
            <div>

                {sessao.days.map((elemento) => {
                    return (

                        <SessionContainer data-test="movie-day" key={elemento.id}>
                            {elemento.weekday} - {elemento.date}
                            <ButtonsContainer>

                                {elemento.showtimes.map((elemento) => {
                                    return (

                                        <Link data-test="showtime" key={elemento.id} to={`/assentos/${elemento.id}`}>
                                            <button >{elemento.name}</button>
                                        </Link>

                                    );
                                }
                                )}

                            </ButtonsContainer>
                        </SessionContainer>
                    );
                }
                )}
            </div>

            <FooterContainer data-test="footer">
                <div>
                    <img src={sessao.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{sessao.title}</p>
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
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
`;
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`;
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
    }
    a {
        text-decoration: none;
    }
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