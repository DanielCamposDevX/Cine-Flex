import axios from "axios";

export default function getMovies(setMovies) {
    axios.get("https://mock-api.driven.com.br/api/v8/cineflex/movies")
        .then(response => {
            setMovies(response.data);
        })
        .catch(() => {
            alert("Erro ao buscar os filmes!")
        })
}