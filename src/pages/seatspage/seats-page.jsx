import { useState, useEffect } from "react";
import styled from "styled-components"
import { useNavigate, useParams } from "react-router-dom";
import getSeats from "../../services/api/get-seats";
import bookSeats from "../../services/api/book-seats";
import handleSeatSelection from "../../services/seat-selection";


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
            (<PageContainer>Carregando...</PageContainer>)
            :
            (<PageContainer>
                Selecione o(s) assento(s)
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
                                onClick={() => alert('Assento indisponível')}
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
                    <input placeholder="Digite seu nome..." value={props.name} onChange={event => props.setName(event.target.value)} data-test="client-name" />

                    CPF do Comprador:
                    <input placeholder="Digite seu CPF..." value={props.cpf} onChange={event => props.setCpf(event.target.value)} data-test="client-cpf" />
                    <Disp>
                        <button data-test="book-seat-btn" onClick={() => {
                            if (seatsId.length > 0 && props.name && props.cpf) {
                                send();
                            }
                            else { alert('Preencha todos os campos') }
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
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
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
    left:0;
    box-shadow:1px 1px 6px orange;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px orange;
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
        color: #FFFFFF;
        width: 225px;
        height: 42px;
        background-color:#E8833A;
        border: none;
        justify-content:center;  
        margin-top:20px;  
    }

`
