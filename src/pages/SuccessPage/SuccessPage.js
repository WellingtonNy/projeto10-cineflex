import styled from "styled-components";
import { Link } from "react-router-dom";

export default function SuccessPage(props) {


    if (props.dados === null) {
        return (
            <Loading>
                <img src="/assets/loading.gif"></img>
            </Loading>
        );
    }


    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <TextContainer data-test="movie-info">
                <strong><p>Filme e sessão</p></strong>
                <p>{props.dados.filme}</p>
                <p>{props.dados.data} - {props.dados.hora}</p>
            </TextContainer>

            <TextContainer data-test="seats-info">
                <strong><p>Ingressos</p></strong>
                {props.dados.cadeira.map((e) => <p key={e}>Assento {e}</p>)}

            </TextContainer>

            <TextContainer data-test="client-info">
                <strong><p>Comprador</p></strong>
                <p>Nome: {props.dados.nome}</p>
                <p>CPF: {props.dados.cpf}</p>
            </TextContainer>
            <Link data-test="go-home-btn" to={'/'}>
                <button>Voltar para Home</button>
            </Link>
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
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        margin-top: 50px;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`;
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
`;