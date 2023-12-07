import styled from "styled-components"
import HomePage from "./pages/homepage/home-page"
import SeatsPage from "./pages/seatspage/seats-page"
import SessionsPage from "./pages/sessionspage/sessions-page"
import SuccessPage from "./pages/successpage/success-page"
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import React, { useState } from "react"
import Header from "./components/header"


export default function App() {
    const [sessiona, setSessiona] = useState();
    const [seats, setSeats] = useState([]);
    const [name, setName] = useState();
    const [cpf, setCpf] = useState();


    return (
        <BrowserRouter>
            <NavContainer>
                <Header />
            </NavContainer>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/assentos/:sessionId" element={<SeatsPage setSeats={setSeats} seats={seats} setName={setName} name={name} setCpf={setCpf} cpf={cpf}  />} />
                <Route path="/sessoes/:movieId" element={<SessionsPage />} />
                <Route path="/sucesso" element={<SuccessPage setSessiona={setSessiona} sessiona={sessiona} setName={setName} name={name} setCpf={setCpf} cpf={cpf} setSeats={setSeats} seats={seats} />} />
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

