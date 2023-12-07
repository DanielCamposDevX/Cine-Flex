import axios from "axios";

export default function bookSeats(ids, name, cpf, navigate) {
    const send = {
        ids,
        name,
        cpf
    };
    axios.post('https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many', send)
        .then(() => {
            navigate("/sucesso");
        })
        .catch((err) => {
            alert("Erro ao reservar os assentos!")
        });
}