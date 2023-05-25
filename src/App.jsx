import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import { BrowserRouter , Routes, Route, useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react"
import Header from "./components/Header"


export default function App() {
    const [selectedid, setSelectedid] = useState();
    const [sessiona, setSessiona] = useState();
    const [seats, setSeats] = useState([]);
    const [clicked, setClicked] = useState([]);
    const [name, setName] = useState();
    const [cpf, setCpf] = useState();
    const { idSessao } = useParams();
    const { idFilme } = useParams();


  
 
    return (
        <BrowserRouter>
            <NavContainer>
                <Header />
            </NavContainer>
            <Routes>
                <Route path="/" element={<HomePage selectedid={selectedid} setSelectedid={setSelectedid} />} />
                <Route path="/assentos/:idSessao" element={<SeatsPage setSelectedid={setSelectedid} selectedid={selectedid} sessiona={sessiona} setClicked={setClicked} clicked={clicked} setName={setName} name={name} setCpf={setCpf} cpf={cpf} setSeats={setSeats} seats={seats} idSessao={idSessao} />} />
                <Route path="/sessoes/:idFilme" element={<SessionsPage setSelectedid={setSelectedid} selectedid={selectedid} setSessiona={setSessiona} idFilme={idFilme} />} />
                <Route path="/sucesso" element={<SuccessPage setSelectedid={setSelectedid} selectedid={selectedid} setSessiona={setSessiona} sessiona={sessiona} setClicked={setClicked} clicked={clicked} setName={setName} name={name} setCpf={setCpf} cpf={cpf} setSeats={setSeats} seats={seats} />} />
            </Routes>
        </BrowserRouter>
    )
}

const NavContainer = styled.div`
                width: 100%;
                height: 70px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #C3CFD9;
                color: #E8833A;
                font-family: 'Roboto', sans-serif;
                font-size: 34px;
                position: fixed;
                top: 0px;
                left:0px;
                a {
                    text-decoration: none;
                color: #E8833A;
    }
              
                `

