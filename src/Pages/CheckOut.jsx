import { useState, useEffect } from "react";
import styled from "styled-components";
import {GiPadlockOpen} from 'react-icons/gi';



function CheckOut(){

    const [shop, setShop] = useState([]);
    const [product, setProduct] = useState([]);

    const sum = shop.reduce((accumulator, currentItem) => {
        if(product.length>0){
              return accumulator + (currentItem.num*product[currentItem.id-1].price);
        }else{
            return "";
        }     
    }, 0);

    useEffect(()=>{
        getData();
        getShop();
    },[])

    const getShop=()=>{
        const data = JSON.parse(localStorage.getItem('shop'));
        setShop(data);
        console.log(shop)
    }
    const getData=async()=>{
        const api = await fetch("https://fakestoreapi.com/products/");
        const data = await api.json();
        setProduct(data);
        
    }   

    return(<Wrapper>
      <Container>
        <h1>CheckOut</h1>
        <Contant>
            <Left>
                <form>
                    <label>Customer information</label>
                    <input name="email" id="email" placeholder="Username or Email Address*" type="text" />
                    <label>Billing details</label>
                    <Row>
                        <input type="text" name="fname" id="fname" placeholder="First name*" />
                        <input type="text" name="lname" id="lname" placeholder="Last name*"/>
                    </Row>
                    <input type="text" name="country" id="country" placeholder="Country/Region*"/>
                    <Row>
                        <input type="text" name="street" id="street" placeholder="House number and street name" />
                        <input type="text" name="number" id="number" placeholder="Apartment, suite, unit, etc."/>
                    </Row>
                    <Row>
                        <input type="text" name="town" id="town" placeholder="Town/City" />
                        <input type="text" name="state" id="state" placeholder="State"/>
                        <input type="text" name="zip" id="zip" placeholder="ZIP Code *"/>
                    </Row>
                    <input type="text" name="phone" id="phone" placeholder="Phone *"/>
                    <label>Additional information</label>
                    <textarea name="text" id="text"  placeholder="Note about your order, e.g. specail notes for delivery."/>
                    <label>Payment</label>
                    <Text>
                        Sorry, it seems that there are no available payment methods for your state. 
                        Please contact us if you require assistance or wish to make alternate arrangements.
                    </Text>
                    <Pay><GiPadlockOpen/>Place order ${sum}</Pay>

                </form>
            </Left>
            <Right >
                <h2>Your order</h2>   
                <Border>
                <StyledRow>  
                    <p>Product</p>
                    <p>Subtotal</p>
                </StyledRow>
              
                    {(product.length>0)?(shop.map(item=>{
                        return(<StyledRow key={item.id}>
                    <Row><img src={product[item.id-1].image} alt="img" /><p>{product[item.id-1].title} x {item.num}</p></Row>
                    <p>${product[item.id-1].price}</p> </StyledRow>)
                    })):""}
                   
               
                <StyledRow>
                    <Total>Total</Total>
                    <Total>${sum}</Total>
                </StyledRow>
            </Border>
            </Right> 
        </Contant>
      </Container>
    </Wrapper>
    )
}
const StyledRow= styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    border-top: 1px solid #ddd;
    margin-left: auto;
    margin-right: auto;
    justify-content: space-between;
    
    color: #979A9B; 
    p{
        padding: 10px;
    }

`

const Total = styled.p`
    color: #9B9E9F;
    font-size: 1.5rem;
    font-weight: 600;
`
const Row= styled.div`
    display: flex;
    flex-direction: row;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    input{
        margin-top: 15px;
        padding: 15px;
    }
    img{
        width: 70px;
    }
`
const Left = styled.div`
    width: 60%;
    margin: 5%;
    label{
        margin-left: 5%;
        margin-top: 2%;
        margin-bottom: 2%;
        font-size: 2rem;
        font-weight: 600;
    }
    form{
        display: flex;
    flex-direction: column;
    text-align: left;
    }
    input{
        margin-top: 15px;
        padding: 15px;
        width: 85%;
        margin-left: auto;
        margin-right: auto;
        border: 1px solid #cbd0d1;
        border-radius: 10px;
    }
    textarea:focus, input:focus{
    outline: none;
    }
    textarea{
        font-size: 1rem;
        resize: none;
        width: 90%;
        height: 50px;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 2%;
        border: 1px solid #cbd0d1;
        border-radius: 10px;
        font-family: 'Kanit', sans-serif;
    }
    
`
const Right = styled.div`
    width: 40%;
    margin: 5%;
    text-align: left;
   
`
const Border = styled.div`
     border: 1px solid #ddd;
    border-radius: 10px;
    height: auto;
`
const Text = styled.div`
    margin: auto;
    width: 90%;
    border-top: 3px solid #6E7051;
    background-color: #F7F6F7;
    color: #6E7051;
    padding: 2%;
`
const Contant = styled.div`
    display: flex;
    flex-direction: row;
`
const Wrapper= styled.div`
    display: flex;
    text-align: center;
    background: #d0d2d2;
    width: 100%;
    min-height: 100vh;
`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 5%;
    margin-bottom: 5%;
    background-color: #fff;
    border-radius: 10px;
    h1{
        margin-top: 10px;
        margin-left: auto;
        margin-right: auto;
    }
    `
const Pay = styled.button`
width: 90%;
padding: 15px;
background: #6E7051;
margin-left: auto;
margin-right: auto;
margin-top: 2rem;
color: rgb(241,241,239);
font-size: 1.5rem;
text-transform: uppercase;
border: none;
border-radius: 2px;
cursor: pointer;
&:hover{
    background-color: #3E4238;
}
`    
export default CheckOut;