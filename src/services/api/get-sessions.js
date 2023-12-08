import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function getSessions(movieId, setSessions) {
    axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${movieId}/showtimes`)
        .then((resposta) => {
            setSessions(resposta.data);
        })
        .catch(() => {
            toast.error("Erro ao buscar as sessões!")
        });
}