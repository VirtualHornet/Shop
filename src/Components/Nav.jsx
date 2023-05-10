import { NavLink } from "react-router-dom";
import styled from 'styled-components';
import {FaShoppingCart} from "react-icons/fa";
import { useEffect , useState } from "react";

function Nav() {

    const [shop, setShop] = useState([]);
  
    useEffect(()=>{
        getShop();
    },[])

    const getShop = ()=>{
        const data = JSON.parse(localStorage.getItem('shop'));
        if(data){
             setShop(data);
        }
    }

    const sum = (shop.length>0)?shop.reduce((accumulator, currentItem) => {
        if(shop.length>0){
              return (accumulator + (currentItem.num))
        }else{
            return "";
        } 
    },0):"";

    return(
        <List> 
            <Logo to="/Shop/">
                CLOTHES SHOP
            </Logo>
            <ul> 
                <StyledNavLink to="/Shop/men">
                    Men
                </StyledNavLink>
                <StyledNavLink to="/Shop/women">
                    Women
                </StyledNavLink>
                <StyledNavLink to="/Shop/electronics">
                    Electonics
                </StyledNavLink>
                <StyledNavLink to="/Shop/jewelery">
                    Jewelery
                </StyledNavLink>
            </ul>
            <Right>
                <StyledNavLink to="/Shop/cart">
                    <FaShoppingCart />
                    <Index>{sum}</Index>
                </StyledNavLink>  
            </Right>
        </List>
    )
}

const List= styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    padding-top: 4px;
    padding-bottom: 4px;
    cursor: pointer;
    ul{
        display: flex;
        justify-content: flex-start;
        gap: 1rem;
    }
`
const Index = styled.p`
    position: absolute;
    top: -22px;
    right: -13px;
    font-size: 0.8rem;
    color: #555454;
    border-radius: 50%;
    padding: 1.5px;
    width: .8rem;
    height: 0.8rem;
    text-align: center;
    align-items: center;
    vertical-align: center;
    cursor: pointer;
    &:hover{
        transition: all 0.3s ease-in-out;
        color: #000;
    }
`
const StyledNavLink = styled(NavLink)`
    font-size: 1rem;
    text-decoration: none;
    text-transform: uppercase;
    color: #555454;
    font-weight: 700;
    cursor: pointer;
    &:hover{
        transition: all 0.3s ease-in-out;
        color: #000;
    }
    &.active{
        color: #000;
    }
`

const Logo = styled(NavLink)`
    font-weight: 800;
    color: #000;
    font-size: 1.8rem;
    word-spacing: 0.5rem;
    text-decoration: none;
    margin-left: 1.5rem;
`

const Right = styled.ul`
    position: absolute;
    right: 5%;
`

export default Nav;