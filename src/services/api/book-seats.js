import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function bookSeats(ids, name, cpf, navigate) {
    const send = {
        ids,
        name,
        cpf
    };
    axios.post('https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many', send)
        .then(() => {
            navigate("/sucesso");
            toast.success("Bilhete Reservado")
        })
        .catch(() => {
            toast.error("Erro ao reservar os assentos!")
        });
}