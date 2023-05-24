import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react"

export default function App() {
   const[selectedid,setSelectedid] = useState();
   const[sessiona,setSessiona] = useState();
   const[name,setName] = useState();
   const[cpf,setCpf] = useState();





    return (
        <BrowserRouter>
            <NavContainer>CINEFLEX</NavContainer>
            
            <Routes>
                <Route path="/" element={<HomePage selectedid={selectedid} setSelectedid={setSelectedid}/>}/>
                <Route path="/Seats" element={<SeatsPage selectedid={selectedid} setSelectedid={setSelectedid} sessiona={sessiona} setName={setName} name={name} cpf={cpf} setCpf={setCpf}/>}/>
                <Route path="/Sessions" element={<SessionsPage selectedid={selectedid} setSelectedid={setSelectedid} setSessiona={setSessiona}/>}/>
                <Route path="/Sucess" element={<SuccessPage selectedid={selectedid} setSelectedid={setSelectedid} sessiona={sessiona}/>}/>
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
                top: 0;
                a {
                    text - decoration: none;
                color: #E8833A;
    }
                `
