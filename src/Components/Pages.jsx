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
            <Route path="/" element={<Home/>}>Clothes Shop</Route>
            <Route path="/men" element={<Men/>}>Men</Route>
            <Route path="/women" element={<Women/>}>Women</Route>
            <Route path="/electronics" element={<Electronics/>}>Electronics</Route>
            <Route path="/jewelery" element={<Jewelery/>}>Jewelery</Route>
            <Route path="/product/:id" element={<Products/>}>Product</Route>
            <Route path="/cart" element={<Cart/>}>Cart</Route>
            <Route path="/checkOut" element={<CheckOut/>}>CheckOut</Route>






        </Routes>
    )
}

export default Pages;