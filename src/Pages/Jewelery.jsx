import { useEffect, useState } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

function Jewelery(){     
    
    const[jew, setJew] = useState({});

    useEffect(()=>{
        getData();
    },[])



    const getData= async() =>{
        const check = localStorage.getItem("jew");
        if(check){
            setJew(JSON.parse(check))
        }else{
             const api = await fetch('https://fakestoreapi.com/products/category/jewelery');
            const data = await api.json();
            localStorage.setItem("jew", JSON.stringify(data))
            setJew(data);
        }
       
        }


    return(
    <motion.div
        animate= {{opacity:1}}
        initial = {{opacity:0}}
        exit={{opacity:0}}
        transition={{duration:0.5}}
      >     
    <Container>
        <Content>
            <Filter>
                <h2>Jewellery</h2>   
            </Filter>
            <Row>
                <p>Showing all {jew.length} results</p>
            </Row>
            <Row>
                {(jew.length>0)?jew.map(item=>{
                return(
                    <Card key={item.id}>
                        <StyledLink to={'/Shop/product/'+item.id}>
                            <img src={item.image} alt="img"/>
                            <h3>{item.title}</h3>
                            <Bolt>{item.price} $</Bolt>
                            <AiOutlineStar/> <AiOutlineStar/> <AiOutlineStar/> <AiOutlineStar/> <AiOutlineStar/>
                        </StyledLink>
                    </Card>
                )
                }):""}
            </Row>
        </Content>
    </Container>
    </motion.div>
       
    )
}
const Container = styled.div`
    display:flex;
    width: 100%;
    height: auto;
    background-color: #F1F1EF;
`
const Bolt = styled.p`
    font-weight: 700;
    color: #6e7051;
`
const StyledLink = styled(Link)`
    text-decoration: none;
    color: #6e7051;;
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap:2rem;
    width: 80%;
    justify-content: center;
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 2%;
    border-radius: 10px;
    margin-bottom: 5%;
    background-color: #fff;
`
const Card = styled.div`
    cursor: pointer;
    width: 300px;
    margin-right: 2%;
    margin-left: 2%;
    margin-bottom: 2%;
    border-radius: 10px;
    text-align: center;
    color: #262B2C;
    img{
        width: 100%;
        height: 300px;
        padding: 15px ;
        background-color: #F1F1EF;
    }
    &:hover{
        img{
            padding: 0;
            width:330px;
            height: 330px;
            transition: all 0.3s ease-in-out;
        }
    }
`
const Filter = styled.h2`
    display: flex;
    text-align: left;
    margin-left: 2%;
    margin-top: 0;
    margin-bottom: 20px;
    color: #6E7051;
`
const Row = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    p{  
        justify-content: left;
        margin:0;
        margin-left: 2%;
        color: #6e7051;
    }
`
export default Jewelery;