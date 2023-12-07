import axios from "axios";

export default function getSessions(movieId, setSessions) {
    axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${movieId}/showtimes`)
        .then((resposta) => {
            setSessions(resposta.data);
        })
        .catch(() => {
            console.log('Deu Ruim');
        });
}