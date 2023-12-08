import styled, { keyframes } from "styled-components"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getMovies from "../../services/api/get-movies";

export default function HomePage() {
    const [movies, setMovies] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getMovies(setMovies)
    }, [])


    return (
        (
            movies.length === 0 ?
                (<PageContainer>Carregando...</PageContainer>)
                :
                (<PageContainer>
                    <h1>Selecione o filme</h1>
                    <ListContainer>
                        {movies.map((movie) => (
                            <MovieContainer key={movie.id} onClick={() => navigate(`/sessoes/${movie.id}`)} >
                                <img src={movie.posterURL} alt="poster" />
                            </MovieContainer>
                        ))}
                    </ListContainer>
                </PageContainer>)
        )
    )
}

const fallAnimation = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
`;

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #222222;
    color: #293845;
    margin-top: 30px;
    padding-top: 70px;
    h1{
        color: rgb(255, 165, 0);
        font-family: 'Roboto', sans-serif;
        font-size: 24px;
        text-align: center;
    }
`
const ListContainer = styled.div`
    width: 90%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    gap: 30px;
    padding: 10px;
    margin-top: 40px;
`




const MovieContainer = styled.button`
    width: 145px;
    height: 210px;
    box-shadow:1px 1px 5px orange;
    border-radius: 8px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #3a301b;
    border: 1px solid orange;
    cursor: pointer;
    transition: transform 300ms ease-out;
    &:hover{
        transform: translate(0px, 0px) scale(1.04, 1.04);
    };
    &:focus{
        transform: translate(0px, 0px) scale(1.04, 1.04);
    };
    img {
        width: 130px;
        height: 190px;
        border-radius: 8px;
    }

`
