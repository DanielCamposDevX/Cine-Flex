import { useState, useEffect } from "react";
import styled from "styled-components"
import { useNavigate, useParams } from "react-router-dom";
import getSeats from "../../services/api/get-seats";
import bookSeats from "../../services/api/book-seats";
import handleSeatSelection from "../../services/seat-selection";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function SeatsPage(props) {

    const { sessionId } = useParams()
    const navigate = useNavigate();
    const [session, setSession] = useState([]);
    const [seatsId, setSeatsId] = useState([]);

    function send() {
        bookSeats(seatsId, props.name, props.cpf, navigate);
    }

    function handleSelection(name, id) {
        handleSeatSelection(name, id, seatsId, setSeatsId, props.seats, props.setSeats);
        props.setSession(sessionId)
    }

    useEffect(() => {
        getSeats(sessionId, setSession)
    }, []);


    return (
        session.length === 0 ?
            (<PageContainer><h1>Carregando...</h1></PageContainer>)
            :
            (<PageContainer>
                <h1>Selecione o(s) assento(s)</h1>
                <SeatsContainer>
                    {session && session.seats && session.seats.map((seat) => (
                        seat.isAvailable ? (
                            <SeatItem
                                appearance={seatsId.includes(seat.id) ? "green" : ""}
                                onClick={() => handleSelection(seat.name, seat.id)}
                                key={seat.id} data-test="seat"
                            >
                                {seat.name}
                            </SeatItem>
                        ) : (
                            <SeatItem2
                                key={seat.id}
                                onClick={() => toast.error('Assento indisponível')}
                                data-test="seat"
                            >
                                {seat.name}
                            </SeatItem2>
                        )
                    ))
                    }
                </SeatsContainer>

                <CaptionContainer>
                    <CaptionItem>
                        <CaptionCircle />
                        <h1>Selecionado</h1>
                    </CaptionItem>
                    <CaptionItem>
                        <CaptionCircle2 />
                        <h1>Disponível</h1>
                    </CaptionItem>
                    <CaptionItem>
                        <CaptionCircle3 />
                        <h1>Indisponível</h1>
                    </CaptionItem>
                </CaptionContainer>

                <FormContainer>
                    <h1>Nome do Comprador:</h1>
                    <input type="text" placeholder="Digite seu nome..." value={props.name} onChange={e => props.setName(e.target.value)} data-test="client-name" />

                    <h1>CPF do Comprador:</h1>
                    <input type="text" placeholder="Digite seu CPF..." value={props.cpf} onChange={e => props.setCpf(e.target.value)} data-test="client-cpf" />
                    <Disp>
                        <button data-test="book-seat-btn" onClick={() => {
                            if (seatsId.length > 0 && props.name && props.cpf) {
                                send();
                            }
                            else { toast.error('Preencha todos os campos') }
                        }}>Reservar Assento(s)</button>
                    </Disp>
                </FormContainer>

                <FooterContainer data-test="footer">
                    {session && session.movie && (
                        <>
                            <div>
                                <img src={session.movie.posterURL} alt="poster" />
                            </div>
                            <div>
                                <p>{session.movie.title}</p>
                                <p>{session.day.weekday} - {session.name}</p>
                            </div>
                        </>
                    )}
                </FooterContainer>
            </PageContainer>)
    )
}



const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    h1{
        color: rgb(255, 165, 0);
        font-family: 'Roboto', sans-serif;
        font-size: 24px;
        text-align: center;
    }
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
    h1{
        color: rgb(255, 165, 0);
        font-family: 'Roboto', sans-serif;
        font-size: 18px;
        text-align: center;
    }
   
    input {
        width: calc(100vw - 40px);
        height:51px;
        font-style: italic;
        font-weight: 400;
        font-size: 18px;
        line-height: 21px;
        display: flex;
        color: #AFAFAF;
        text-align: start;
        box-sizing: border-box;
        border: 1px solid orange;
        background: #383838;
        border-radius: 3px;
        padding-left:20px;
        margin-bottom:10px
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
    background-color: #ffffff;    
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionCircle3 = styled.div`
    border: 1px solid #f72b2b;
    background-color:#f54e00;    
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
    h1{
        color: rgb(255, 165, 0);
        font-family: 'Roboto', sans-serif;
        font-size: 12px;
        text-align: center;
    }
`
const SeatItem = styled.div`
    border: 1px solid ${({ appearance }) => appearance === 'green' ? '#29cf08' : '#ff8800'};         
    background-color: ${({ appearance }) => appearance === 'green' ? '#57e605' : '#ffffff'};;   
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
    border: 1px solid #f72b2b;         // Essa cor deve mudar
    background-color:#f54e00;    // Essa cor deve mudar
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
    background-color: #292929e6;
    color: orange;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;
    left:0;
    box-shadow:1px 1px 6px orange;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px orange;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: black;
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

const Disp = styled.div`
    width:100%;
    display:flex;
    justify-content:center;
    button {
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 21px;
        text-align: center;
        letter-spacing: 0.04em;
        color: orange;
        border-radius: 8px;
        width: 225px;
        height: 42px;
        background-color: black;
        border: 1px solid orange;
        justify-content:center;  
        margin-top:20px;  
    }

`
