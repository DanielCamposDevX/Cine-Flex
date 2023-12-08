import styled, { keyframes } from "styled-components"
import HomePage from "./pages/homepage/home-page"
import SeatsPage from "./pages/seatspage/seats-page"
import SessionsPage from "./pages/sessionspage/sessions-page"
import SuccessPage from "./pages/successpage/success-page"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react"
import Header from "./components/header"
import ResetStyle from "./style/reset-style"



export default function App() {
    const [session, setSession] = useState();
    const [seats, setSeats] = useState([]);
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");


    return (
        <BrowserRouter>
            <ResetStyle />
            <Header />
            <Routes>
                <Route
                    path="/"
                    element={
                        <TransitionWrapper key="home" isEntering={true}>
                            <HomePage />
                        </TransitionWrapper>
                    }
                />
                <Route
                    path="/assentos/:sessionId"
                    element={
                        <TransitionWrapper key="seats" isEntering={true}>
                            <SeatsPage setSeats={setSeats} seats={seats} setName={setName} name={name} setCpf={setCpf} cpf={cpf} setSession={setSession} />
                        </TransitionWrapper>
                    }
                />
                <Route
                    path="/sessoes/:movieId"
                    element={
                        <TransitionWrapper key="sessions" isEntering={true}>
                            <SessionsPage />
                        </TransitionWrapper>
                    }
                />
                <Route
                    path="/sucesso"
                    element={
                        <TransitionWrapper key="success" isEntering={true}>
                            <SuccessPage setSession={setSession} session={session} setName={setName} name={name} setCpf={setCpf} cpf={cpf} setSeats={setSeats} seats={seats} />
                        </TransitionWrapper>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}

const enterFromLeft = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const TransitionWrapper = styled.div`
  position: absolute;
  width: 100%;
  opacity: ${(props) => (props.isEntering ? 1 : 0)};
  animation: ${(props) => (props.isEntering ? enterFromLeft : "none")} 0.9s ease-in-out;
`;
