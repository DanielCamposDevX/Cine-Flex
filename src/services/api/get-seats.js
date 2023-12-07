import axios from "axios";

export default function getSeats(sessionId,setSessions) {
    axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${sessionId}/seats`)
        .then((resposta) => {
            setSessions(resposta.data);
        })
        .catch(() => {
            alert("Erro ao buscar os assentos!")
        });
}