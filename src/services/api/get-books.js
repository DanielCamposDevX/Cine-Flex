import axios from "axios";

export default function getBooks(sessionId, setData,navigate) {
    axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${sessionId}/seats`)
        .then((resposta) => {
            setData(resposta.data);
        })
        .catch(() => {
            alert('Erro ao buscar a sessão!');
            navigate("/")
        });
}