import styled from "styled-components"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import getBooks from "../../services/api/get-books";

export default function SuccessPage(props) {

    const [data, setData] = useState([]);
    const navigate = useNavigate();

    function handleClick() {
        props.setName("");
        props.setCpf("");
        props.setSession(null);
        navigate("/")
    }


    useEffect(() => {
        getBooks(props.session, setData, navigate);
    }, []);

    return (

        data.length === 0 ?
            (<PageContainer><h1>Carregando...</h1></PageContainer>)
            :
            (<>
                {data.movie ? (
                    <PageContainer>
                        <h1>Pedido feito <br /> com sucesso!</h1>

                        <TextContainer data-test="movie-info">
                            <strong><p>Filme e sessão</p></strong>
                            <p>{data.movie.title}</p>
                            <p>{data.day.date} - {data.name}</p>
                        </TextContainer>

                        <TextContainer data-test="seats-info">
                            <strong><p>Ingressos</p></strong>
                            {props.seats.map((seat, index) => (
                                <p key={index}>Assento {seat}</p>

                            ))}
                        </TextContainer>

                        <TextContainer data-test="client-info">
                            <strong><p>Comprador</p></strong>
                            <p>Nome: {props.name}</p>
                            <p>CPF: {props.cpf}</p>
                        </TextContainer>
                        <button data-test="go-home-btn" onClick={() => handleClick()}>
                            Voltar para Home
                        </button>
                    </PageContainer>) : null}
            </>))
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
    gap: 10px;
    a {
        text-decoration: none;
    }
    button {
       
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 21px;
        text-align: center;
        letter-spacing: 0.04em;
        color: orange;
        width: 225px;
        height: 42px;
        border-radius: 8px;
        background-color: black;
        border: 1px solid orange;
        justify-content: center;  
        margin-top:20px;  
   
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
        color: orange;
    }
`
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    margin-top: 30px;
    font-size:22px;
    color: white;
    strong {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 10px;
    }
`