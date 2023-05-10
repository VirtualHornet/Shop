import {Route, Routes} from 'react-router-dom';
import Home from '../Pages/Home';
import Men from '../Pages/Men';
import Women from '../Pages/Women';
import Electronics from '../Pages/Electronics';
import Jewelery from '../Pages/Jewelery';
import Products from '../Pages/Products';
import Cart from '../Pages/Cart';
import CheckOut from '../Pages/CheckOut';

function Pages (){
    return(
        <Routes>
            <Route path="/Shop/" element={<Home/>}></Route>
            <Route path="/Shop/men" element={<Men/>}></Route>
            <Route path="/Shop/women" element={<Women/>}></Route>
            <Route path="/Shop/electronics" element={<Electronics/>}></Route>
            <Route path="/Shop/jewelery" element={<Jewelery/>}></Route>
            <Route path="/Shop/product/:id" element={<Products/>}></Route>
            <Route path="/Shop/cart" element={<Cart/>}></Route>
            <Route path="/Shop/checkOut" element={<CheckOut/>}></Route>






        </Routes>
    )
}

export default Pages;