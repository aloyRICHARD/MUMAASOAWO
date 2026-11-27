import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductPage from './pages/ProductPage'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Confirmation from './pages/Confirmation'
import Account from './pages/Account'
import Wishlist from './pages/Wishlist'
import About from './pages/About'
export default function App(){return(<Routes><Route element={<Layout/>}>
<Route path="/" element={<Home/>}/><Route path="/shop" element={<Shop/>}/>
<Route path="/men" element={<Shop gender="men"/>}/><Route path="/women" element={<Shop gender="women"/>}/>
<Route path="/new" element={<Shop onlyNew/>}/><Route path="/product/:slug" element={<ProductPage/>}/>
<Route path="/cart" element={<Cart/>}/><Route path="/checkout" element={<Checkout/>}/>
<Route path="/order/:id" element={<Confirmation/>}/><Route path="/account" element={<Account/>}/>
<Route path="/wishlist" element={<Wishlist/>}/><Route path="/about" element={<About/>}/>
<Route path="*" element={<div className="p-20 text-center"><h1 className="text-3xl">Page not found</h1></div>}/></Route></Routes>)}
