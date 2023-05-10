import { Link } from "react-router-dom";
import styled from "styled-components";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useEffect, useState } from "react";
import {motion} from'framer-motion';

function Home (){

    const [data, setData] = useState([]);
    
    useEffect(()=>{
        getData();
    },[])

    const getData = async ()=>{
        const api = await fetch('https://fakestoreapi.com/products')
        const data = await api.json();
        setData(data);
    }


    return( <motion.div
        animate= {{opacity:1}}
        initial = {{opacity:0}}
        exit={{opacity:0}}
        transition={{duration:0.5}}
      > 
        <Container>
            <Dark>
                <Content>
                    <h1>
                        Love the Planet we walk on
                    </h1>  
                    <p>
                    Bibendum fermentum, aenean donec pretium 
                    aliquam blandit tempor imperdiet arcu arcu ut nunc in dictum mauris at ut.
                    </p>
                    <Buttons>
                        <Link to="/Shop/men"><button>Shop Men</button></Link>
                        <Link to="/Shop/women"><button>Shop Women</button></Link>
                    </Buttons>
                </Content>
            </Dark>
            <Light>
                <h2>New Arrivals</h2>
                <Splide options={{
                        arrows: false,
                        drag: "free",
                        gap: "2rem",
                        type   : 'loop',
                        autoplay: true,
                        perPage: 3,
                        focus  : 'center',
                        breakpoints: {
                            1000: { 
                                direction: 'ttb',
                                height:"100vh",
                                gap: "2rem"
                            }
                      }
                    }}>
                    {data.map(item=>{
                        if(item.id%3===0){
                        return(
                            <SplideSlide key={item.id}>
                                <Card >
                                    <StyledLink to={"/Shop/product/"+item.id}>
                                        <img src={item.image} alt="img" />
                                        <h3>{item.title}</h3>
                                    </StyledLink>
                                </Card>
                            </SplideSlide>
                        )
                        }
                    })}
                </Splide>
            </Light>
            <Dark>
                <Image>
                    <h2>Better for People & the Planet</h2>
                    <p>Ut eget at et aliquam sit quis nisl, pharetra et ac pharetra est dictum in vulputate</p>
                    <Row> 
                        <Link to="/Shop/men"><button>Shop Men</button></Link>
                        <Link to="/Shop/women"><button>Shop Women</button></Link>
                    </Row>
                   
                  
                </Image>
            </Dark>
        </Container>
        </motion.div>
    )
}

const Container = styled.div`
    display:flex;
    flex-direction: column;
  
`
const Dark = styled.div`
    display: flex;
    width: 100%;
    background-color: #F1F1EF;
    justify-content: center;
    

    h1{
        font-size: 5rem;
        display: flex;
        justify-content: left;
        margin-left: 15%;
        margin-right: 50%;
        margin-top: 8%;
        color: #fff;  
        opacity: 1;
    }
    p{
        display: flex;
        justify-content: left;
        margin-left: 15%;
        margin-right: 50%;
        font-size: 1.5rem;
        color: #fff;  
        opacity: 1;
    }
   
`
const Buttons = styled.div`
    margin-left: 15%;
    margin-bottom: 8%;
`
const Row = styled.div`
    flex-direction: row;
`
const Content = styled.div`
    width: 90%;
    background-image: url("https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-hero-image-bg.jpg");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0.9;
    margin-left: auto;
    margin-right: auto;
    margin-top: 2%;
    border-radius: 10px;
    margin-bottom: 2%;
    button{
        padding: 14px;
        margin-right: 10px;
        border: none;
        text-transform: uppercase;
        font-weight: 600;
        cursor: pointer;
        word-spacing: 5px;
        border-radius: 10px;
        background: #f9f9f9;
    }
    button:hover{
        background-color: #383838;
        color: #f9f9f9;
        transition: all ease-in-out 0.3s;
    }
`
 
const Image = styled.div`
    background-image: url("https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-cta-image-bg.jpg");
    background-position: center;
    background-repeat: none;
    width: 100%;
    height: 60vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h2{
        font-size: 5rem;
        color: #fff;
    }
    p{
        margin: 0;
        font-size: 1.5rem;
    }
    button{
        width: 150px;
        padding: 14px;
        margin-right: 10px;
        border: none;
        text-transform: uppercase;
        font-weight: 600;
        cursor: pointer;
        word-spacing: 5px;
        background: #f9f9f9;
    }
    button:hover{
        background-color: #383838;
        color: #f9f9f9;
        transition: all ease-in-out 0.3s;
    }
`
const Light = styled.div`
    background: #fff;
    min-height: 50vh;
    margin-left: 5%;
    margin-right: 5%;
    h2{
        color: #6E7051;
    }
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
const StyledLink = styled(Link)`
    text-decoration: none;
    color: #6E7051;
`

export default Home;