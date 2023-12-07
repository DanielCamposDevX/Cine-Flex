import styled from "styled-components"
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMovies } from "../../services/get-movies";

export default function HomePage(props) {
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
                    Selecione o filme
                    <ListContainer>
                        {movies.map((movie) => (
                            <MovieContainer onClick={() => navigate(`/sessoes/${movie.id}`)} >
                                <img src={movie.posterURL} alt="poster" />
                            </MovieContainer>
                        ))}
                    </ListContainer>
                </PageContainer>)
        )
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
    box-shadow:1px 1px 5px orange;
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
