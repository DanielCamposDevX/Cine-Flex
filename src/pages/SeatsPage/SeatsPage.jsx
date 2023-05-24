import { useState, useEffect } from "react";
import styled from "styled-components"
import axios from "axios";

export default function SeatsPage(props) {
    function handleClick(id) {
        const newClicked = [...clicked, id];
        setClicked(newClicked);
        console.log(newClicked);
    }


    const [clicked, setClicked] = useState([]);
    const [seat, setSeat] = useState();

    useEffect(() => {
        if (props.sessiona) {
            const promisse = axios.get('https://mock-api.driven.com.br/api/v8/cineflex/showtimes/' + props.sessiona + '/seats');
            promisse.then((resposta) => {
                setSeat(resposta.data);
                console.log(resposta);
            })
                .catch(() => {
                    console.log('Deu Ruim');
                });
        }
    }, [props.sessiona]);

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {seat && seat.seats && seat.seats.map((seat) => (
                    seat.isAvailable ? (
                        <SeatItem
                            appearance={clicked.includes(seat.id) ? "green" : ""}
                            onClick={() => handleClick(seat.id)}
                            key={seat.id}
                        >
                            {seat.name}
                        </SeatItem>
                    ) : (
                        <SeatItem2 key={seat.id}>{seat.name}</SeatItem2>
                    )
                ))}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle2 />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle3 />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                Nome do Comprador:
                <input placeholder="Digite seu nome..." />

                CPF do Comprador:
                <input placeholder="Digite seu CPF..." />

                <button>Reservar Assento(s)</button>
            </FormContainer>

            <FooterContainer>
                <div>
                    <img src={seat.movie.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{seat.movie.title}</p>
                    <p>{seat.day.weekday} - {seat.name}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

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
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
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
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid #0E7D71;        
    background-color: #1AAE9E;    
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionCircle2 = styled.div`
    border: 1px solid #7B8B99;         
    background-color: #C3CFD9;    
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionCircle3 = styled.div`
    border: 1px solid #F7C52B;         
    background-color: #FBE192;   
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.div`
    border: 1px solid ${({ appearance }) => appearance === 'green' ? '#0E7D71' : '#7B8B99'};         
    background-color: ${({ appearance }) => appearance === 'green' ? '#1AAE9E' : '#C3CFD9'};;   
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
    
`
const SeatItem2 = styled.div`
    border: 1px solid #F7C52B;         // Essa cor deve mudar
    background-color:#FBE192;    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
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
`