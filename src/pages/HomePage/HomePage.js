import styled from "styled-components"
import axios from "axios"
import { useEffect, useState } from "react"


export default function HomePage() {

    const [filme, setFilme] = useState(null);

   
    useEffect(() => {
		const requisicao = axios.get("https://mock-api.driven.com.br/api/v8/cineflex/movies");

		requisicao.then(resposta => {
			setFilme(resposta.data);
            console.log(resposta)
		});

        requisicao.catch(resposta =>{
            console.log(resposta.request.status)
        });

	}, []);

      if(filme===null){
        return (
             <Loading>
                <img src="assets/loading.gif"></img>
                </Loading> 
             ) 
      }

    return (
        <PageContainer>
            Selecione o filme

            <ListContainer>

                {filme.map((elemento)=>{
                    return(

                    <MovieContainer>
                    <img src={elemento.posterURL} alt="poster" />
                </MovieContainer>

                )
                })}

            </ListContainer>

        </PageContainer>
    )
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
`
const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-top: 70px;
`
const ListContainer = styled.div`
    width: 330px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 10px;
`
const MovieContainer = styled.div`
    width: 145px;
    height: 210px;
    box-shadow: 0px 2px 4px 2px #0000001A;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    img {
        width: 130px;
        height: 190px;
    }
`