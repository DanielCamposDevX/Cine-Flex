import styled from "styled-components"
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";


export default function Header() {


    const navigate = useNavigate();


    return (
        <HeaderMain>
            {window.location.pathname !== "/" && (
                <button onClick={() => navigate(-1)} data-test="go-home-header-btn" >
                    <CustomArrow />
                </button>
            )}
            CINEFLEX
        </HeaderMain>
    );
}


const HeaderMain = styled.div`
    z-index: 10000;
    position: fixed;
    top: 0px;
    left: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 10vh;
    color: orange;
    font-family: 'Roboto', sans-serif;
    font-size: 30px;
    box-shadow:1px 1px 5px orange;
    background-color: #292929b9;
    font-weight: bold;

    button {
        background-color: transparent;
        border: none;
        position: absolute;
        left: 10px;
        top: center;
        cursor: pointer;
    }
`;

const CustomArrow = styled(FaArrowLeft)`
    font-size: 24px;
    color: orange;
`
