import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {FaCcVisa, FaCcMastercard, FaCcDiscover} from 'react-icons/fa';
import {SiAmericanexpress} from 'react-icons/si';
import {BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill} from 'react-icons/bs';
import { Link } from "react-router-dom";

function Products (){
    const param = useParams();
    const [product, setProduct] = useState({});
    const [id , setId] = useState(Number(param.id));
    const [num ,setNum] = useState(1);
    const navigate = useNavigate();
    const navigate2 = useNavigate();


    useEffect(()=>{
        getData(id);
        navigate('/product/'+id); 
        console.log(product)
    },[id])

    const saveCart =()=>{
        const existingObj1 = JSON.parse(localStorage.getItem('shop'));
        if(!existingObj1){
            let arr2= [];
            arr2.push({id:id, num: num});
            localStorage.setItem('shop', JSON.stringify(arr2));
            window.location.reload(); 
        }else{
            let found = false; 
             let arr = [...existingObj1];
            arr.forEach((obj)=>{
                if(obj.id === id){
                    console.log(obj.key)
                    obj.num += num;
                    found = true;
                }
                window.location.reload();     
            }) 
            if(!found){
                 arr.push({id:id, num: num})  
                 window.location.reload(); 
            }
            
             localStorage.setItem('shop', JSON.stringify(arr));
        }
    }

    const getData= async (id) =>{
        const api = await fetch('https://fakestoreapi.com/products/'+id);
        const data = await api.json();
        setProduct(data);
    }

    return(
        <Container>
            <Content>
                <Row>
                    <Col>
                        <Image src={product.image} alt="img"/>
                    </Col>
                    <Col>
                        <Green>
                            <Link to={"/"+product.category}>
                            {product.category}
                            </Link>
                            <ArrowContainer>
                                    <LeftArrow onClick={()=>{
                                        setId(num=>(num>2)?(num-1):(num=1))
                                       }}/>
                                    <RightArrow onClick={()=>{
                                        setId(num=>(num<20)?(num+1):(num=20))
                                    }}/>
                               
                            </ArrowContainer>
                        </Green>
                        <div>
                            <h2>{product.title}</h2>
                        </div>
                        <Price>
                            <span>${product.price}</span> & Free Shipping
                        </Price>
                        <Price>
                            {product.description}
                        </Price>
                        <div>
                            <Button
                            onClick={()=>setNum(item=>(item>2)?item-1:item=1)}
                            >-</Button>
                            <Num>{num}</Num>
                            <Button
                            onClick={()=>setNum(item=>item+1)}
                            >+</Button>
                            <Add onClick={()=>{   
                                saveCart(); 
                                navigate2("/cart")}}>ADD TO CART</Add>
                        </div>
                        <Cat>Category:  <Link to={"/"+product.category}>
                            {product.category}
                            </Link></Cat>
                        <CheckContainer>
                            <h4>Guaranteed Safe Checkout</h4>
                            <div>
                                <FaCcVisa/><FaCcMastercard /><SiAmericanexpress /><FaCcDiscover/>
                            </div>
                        </CheckContainer>
                    </Col>
                </Row>
            </Content>
        </Container>
    )
}

const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 2rem;
    margin-right: 1%;
`
const Cat = styled.div`
    color: #9AA0A1;
    border-top: solid 1px #cbd0d1;
    a{
        color: #6e7051;
        text-decoration: none;
        cursor: pointer;
    }
`
const Col = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
`
const Button = styled.button`
    margin-top: 3%;
    margin-bottom: 2%;
    width: 2rem;
    height: 2rem;
    color: #9AA0A1;
    background-color: #fff;
    padding: 8px;
    border: 1px solid #9AA0A1;
    cursor: pointer;
`
const CheckContainer= styled.div`
    margin-top: 3%;
    margin-bottom: 3%;
    height: 13vh;
    border:  1px solid #cbd0d1;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1;
    h4{
        position: relative;
        margin-bottom: 0;
        height: 10%;
        top:-60px;
        padding: 10px;
        z-index: 10;
        color: #9AA0A1;
        background: #fff;
    }
    div{
        width: 100%;
        display: flex;
        font-size: 3rem;
        justify-content: space-around;
    }
`
const Num = styled.button`
    width: 2.5rem;
    font-size: 1rem;
    font-weight: 700;
    background-color: #fff;
    border: 1px solid #9AA0A1;
    height: 2rem;
`
const Add = styled.button`
    text-align: center;
    margin-left: 5rem;
    padding: 15px;
    color: #fff;
    font-weight: 600;
    background: #6e7051;
    border: none;
    cursor: pointer;
    &:hover{
        background-color: #515151;
    }
`
const Price = styled.div`
    color:rgb(178,154,155);
    span{
        color: #979A9B;
        font-size: 2rem;
    }
`
const ArrowContainer = styled.div`
    font-size: 2rem;
    width: 15%;
`
const LeftArrow = styled(BsFillArrowLeftSquareFill)`
    margin-right: 1rem;
    cursor: pointer;
    &:hover{
        color: #515151;
    }
`
const RightArrow = styled(BsFillArrowRightSquareFill)`
    cursor: pointer;
    &:hover{
        color: #515151;
    }
`

const Green = styled.div`
    a{
        color: #6e7051;
        text-decoration: none;
        text-transform: uppercase;
        font-style: italic;
    }
    color: #6e7051;
    display: flex;
    justify-content: space-between;
`

const Image = styled.img`
    margin-top: 10%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 2%;
    width: 450px;
    height: 450px;
    background: #F1F1EF;
    padding: 30px;
    &:hover{
        transition: all 0.3s ease-in-out;
        width: 510px;
        height: 510px;
        padding: 0;
    }
`

const Content = styled.div`
    width: 80%;
    min-height: 100vh;
    margin-top: 2rem;
    margin-bottom: 2rem;
    border-radius: 10px;
    background: #fff;
    border-bottom: 2px solid #000;
`
const Container = styled.div`
    width: 100%;
    min-height: 75vh;
    margin-bottom: 15px;
    display: flex;
    justify-content: center;
    background: #F1F1EF;
`

export default Products;