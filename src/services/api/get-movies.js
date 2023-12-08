import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function getMovies(setMovies) {
    axios.get("https://mock-api.driven.com.br/api/v8/cineflex/movies")
        .then(response => {
            setMovies(response.data);
        })
        .catch(() => {
            toast.error("Erro ao buscar os filmes!")
        })
}