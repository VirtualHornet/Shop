import { Link } from "react-router-dom";
import styled from "styled-components";

function Footer() {
    return(
        <Foo>©2023 Created by <Link to="https://github.com/VirtualHornet?tab=repositories">Attila Celluska </Link> </Foo>
    )
}

const Foo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #6e7051;
    a{
        text-decoration: none;
        color: #6e7051;
        padding-top:5px;
        padding-bottom: 5px;
    }
`

export default Footer;