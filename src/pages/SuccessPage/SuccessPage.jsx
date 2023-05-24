import styled from "styled-components"
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SuccessPage(props) {

    const [data, setData] = useState([]);

    function handleClick() {
    props.setSelectedid("");
    props.setSessiona("");
    props.setSeats("");
    props.setClicked("");
    props.setName("");
    props.setCpf("");
    }


    useEffect(() => {
        if (props.sessiona) {
            const promisse = axios.get('https://mock-api.driven.com.br/api/v8/cineflex/showtimes/' + props.sessiona + '/seats');
            promisse.then((resposta) => {
                setData(resposta.data);
            })
                .catch(() => {
                    console.log('Deu Ruim');
                });
        }
    }, [props.sessiona]);

    if (data.length === 0) {
        return (<PageContainer>Carregando...</PageContainer>)
    }

    return (
        <>
            {data.movie ? (
                <PageContainer>
                    <h1>Pedido feito <br /> com sucesso!</h1>

                    <TextContainer>
                        <strong><p>Filme e sessão</p></strong>
                        <p>{data.movie.title}</p>
                        <p>{data.day.date} - {data.name}</p>
                    </TextContainer>

                    <TextContainer>
                        <strong><p>Ingressos</p></strong>
                        {props.clicked.map((seat, index) => (
                            <p key={index}>Assento {seat}</p>

                        ))}
                    </TextContainer>

                    <TextContainer>
                        <strong><p>Comprador</p></strong>
                        <p>Nome: {props.name}</p>
                        <p>CPF: {props.cpf}</p>
                    </TextContainer>

                    <Link to="/"><button onClick={() => handleClick()}>Voltar para Home</button></Link>
                </PageContainer>) : null}
        </>)
}

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
`
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
`