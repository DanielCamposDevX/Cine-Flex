import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function getSeats(sessionId,setSessions) {
    axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${sessionId}/seats`)
        .then((resposta) => {
            setSessions(resposta.data);
        })
        .catch(() => {
            toast.error("Erro ao buscar os assentos!")
        });
}