import styled from "styled-components"
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getSessions from "../../services/api/get-sessions";

export default function SessionsPage() {

    const navigate = useNavigate();
    const { movieId } = useParams();
    const [movie, setMovie] = useState([]);


    useEffect(() => {
        getSessions(movieId, setMovie)
    }, []);


    return (
        movie.length === 0 ?
            (<PageContainer>Carregando...</PageContainer>)
            :
            (<PageContainer>
                Selecione o horário
                <div>
                    {movie.days && movie.days.map((session) => (
                        <SessionContainer key={session.id} data-test="movie-day" >
                            {session.weekday} - {session.date}
                            <ButtonsContainer>
                                {session.showtimes.map((sessionTime) =>
                                (
                                    <button onClick={() => navigate(`/assentos/${sessionTime.id}`)} >
                                        {sessionTime.name}
                                    </button>
                                ))}
                            </ButtonsContainer>
                        </SessionContainer>
                    ))}
                </div>
                <FooterContainer data-test="footer">
                    <div>
                        <img src={movie.posterURL} alt="poster" />
                    </div>
                    <div>
                        <p>{movie.title}</p>
                    </div>
                </FooterContainer>
            </PageContainer>)
    )
}

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
`
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
        background-color:#E8833A;
        border-radius: 3px;
        height: 43px;
        width:83px;
        border:none;
        color:white;
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 21px;
        letter-spacing: 0.02em;
        cursor: pointer;
    }
    a {
        text-decoration: none;
    }
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
    left: 0;
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
    p{
        margin-bottom: 35px;
    }

   
`