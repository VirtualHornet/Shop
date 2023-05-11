import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import {CiCircleRemove} from"react-icons/ci";
import { motion } from "framer-motion";
function Cart (){ 
    const [shop, setShop] = useState([]);

    const [product, setProduct] = useState([]);

   
    

    useEffect(()=>{ 
        getData();
        getShop(); 
    }, [])

    const getData=async()=>{
        const api = await fetch("https://fakestoreapi.com/products/");
        const data = await api.json();
        setProduct(data);
    }   

    const getShop=()=>{
        const data = JSON.parse(localStorage.getItem('shop'));
        setShop(data);
        
    }
    function increaseNum(id) {
        setShop(shop.map(item => {
          if (item.id === id) {
            return { ...item, num: item.num + 1 };
          }
          return item;
        }));
    }
    function decreaseNum(id) {
        setShop(shop.map(item => {
          if (item.id === id) {
            if(item.num>=2){
                 return { ...item, num: item.num - 1 };
            }
          }
          return item;
        }));
    }

    const sum = shop.reduce((accumulator, currentItem) => {
        if(product.length>0){
              return accumulator + (currentItem.num*product[currentItem.id-1].price);
        }else{
            return "";
        }     
      }, 0);
    const saveData = ()=>{
        localStorage.setItem('shop', JSON.stringify(shop));
       
    }  

    const removeProduct=(e)=>{
        let items = JSON.parse(localStorage.getItem('shop'));
        let idToRemove = e; 
        let indexToRemove = -1;

        for (let i = 0; i < items.length; i++) {
        if (items[i].id === idToRemove) {
            indexToRemove = i;
            break;
        }
        }

        if (indexToRemove !== -1) {
        items.splice(indexToRemove, 1);
        }

        localStorage.setItem('shop', JSON.stringify(items));
        window.location.reload();
    }

    return(
        <motion.div
        animate= {{opacity:1}}
        initial = {{opacity:0}}
        exit={{opacity:0}}
        transition={{duration:0.5}}
      > 
    <Wrapper>
        <Div>
        <h1>Cart</h1>  
        <Container> 
        
        <table>
            <thead>
            <tr>
                <th>
                </th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
           
        
            {(product.length>0&& shop.length>0)?shop.map(item=>{
            return(<tr key={item.id}>
               
                <td><Link to={"/Shop/product/"+item.id}><img src={product[item.id-1].image} alt="img" /></Link></td>
                <td><StyledLink to={"/Shop/product/"+item.id}>{product[item.id-1].title}</StyledLink></td>
                <td>${product[item.id-1].price}</td>
             <td>
            <div>
            <Button
                onClick={()=>decreaseNum(item.id)}
                >-</Button>
            <Num>{item.num}</Num>
            <Button
                onClick={()=>increaseNum(item.id)}
                >+</Button>
            </div> 
        </td>
            <td>${item.num*product[item.id-1].price}</td>
              <Remove><CiCircleRemove onClick={()=>removeProduct(item.id)}/> </Remove>
            </tr>
            )}):<tr><td>No Product selected</td></tr>}
        </tbody>
        </table>


        <table>
            <thead>
            <tr>
                <th>
                    Cart totals
                </th>
                <th></th>
            </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Total</td>
                    <td><span>${(shop.length>0)?sum:""}</span></td>
                </tr>
                <tr>
                    <td><Link to="/Shop/checkOut" onClick={()=>saveData()}><Proceed>Proceed to checkout</Proceed></Link></td>
                </tr>
            </tbody>
        </table>

    
        </Container> 
        </Div>
    </Wrapper>
    </motion.div>
    )
}
const Wrapper= styled.div`
    text-align: center;
    display: flex;
    background: #d0d2d2;
    width: 100%;
    min-height: 100vh;
`
const Div = styled.div`
    display:flex;
    color: #262B2C;
    width: 80%;
    margin:2% auto ;
    background-color: #fff;
    flex-direction: column;
    border-radius: 10px;
    h1{
        font-size: 3rem;
        margin-top: 2%;
    }
`   
const StyledLink = styled(Link)`
    text-decoration: none;
    color: #6e7051;;
`
const Container = styled.div`
    display: flex;
    border-radius: 10px;
    table{
        margin-top: 10px;
        margin-bottom: 10px;
    }
    table,tr, th{
        text-align: left;
        margin-left: auto;
        margin-right: auto;
        padding: 10px;
        border-collapse:collapse;
        width: 40%;
        color: #6e7051;
    }
    thead{
        background: #F1F1EF;
        color: #979AA6;
        border: 1px solid #d0d2d2;
    }
    tbody{
        border: 1px solid #d0d2d2;
        text-decoration: none;
    }
    img{
        width: 60px;
        justify-self: center;
    }
    td div{
        display: flex;
        flex-direction: row;
    }
    td{
       padding: 15px;
    }

`
const Remove = styled.td`
    font-size: 1.5rem;
    cursor: pointer;
    
`
const Proceed = styled.button`
    width: 100%;
    height: 10vh;
    background: #6E7051;
    color: rgb(241,241,239);
    font-size: 2.5rem;
    text-transform: uppercase;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    &:hover{
        background-color: #3E4238;
    }
    @media screen and (max-width: 1700px) {
        font-size: 1rem;
  
    }
`

const Button = styled.button`
    margin-bottom: 2%;
    width: 2rem;
    height: 2rem;
    color: #9AA0A1;
    background-color: #fff;
    padding: 8px;
    border: 1px solid #9AA0A1;
    cursor: pointer;
`
const Num = styled.button`
    width: 2.5rem;
    font-size: 1rem;
    font-weight: 700;
    background-color: #fff;
    border: 1px solid #9AA0A1;
    height: 2rem;
`

export default Cart;