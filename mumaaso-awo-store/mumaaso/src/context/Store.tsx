import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import type { CartLine, Order } from '../types'
import { getProduct } from '../data/products'
import { DELIVERY, FREE_OVER } from '../utils/format'
const load=<T,>(k:string,d:T):T=>{try{return JSON.parse(localStorage.getItem(k)||'')??d}catch{return d}}
interface Ctx{cart:CartLine[];wish:string[];orders:Order[];coupon:string;add:(l:CartLine)=>void;setQty:(s:string,z:string,q:number)=>void;remove:(s:string,z:string)=>void;clear:()=>void;toggleWish:(s:string)=>void;addOrder:(o:Order)=>void;applyCoupon:(c:string)=>boolean;count:number;subtotal:number;discount:number;delivery:number;total:number;flash:string;notify:(m:string)=>void}
const C=createContext<Ctx>(null!)
export const useStore=()=>useContext(C)
export function StoreProvider({children}:{children:ReactNode}){
 const [cart,setCart]=useState<CartLine[]>(()=>load('m_cart',[]))
 const [wish,setWish]=useState<string[]>(()=>load('m_wish',[]))
 const [orders,setOrders]=useState<Order[]>(()=>load('m_orders',[]))
 const [coupon,setCoupon]=useState<string>(()=>load('m_coupon',''))
 const [flash,setFlash]=useState('')
 useEffect(()=>{localStorage.setItem('m_cart',JSON.stringify(cart))},[cart])
 useEffect(()=>{localStorage.setItem('m_wish',JSON.stringify(wish))},[wish])
 useEffect(()=>{localStorage.setItem('m_orders',JSON.stringify(orders))},[orders])
 useEffect(()=>{localStorage.setItem('m_coupon',JSON.stringify(coupon))},[coupon])
 const notify=(m:string)=>{setFlash(m);setTimeout(()=>setFlash(''),2200)}
 const subtotal=cart.reduce((a,l)=>a+(getProduct(l.slug)?.price||0)*l.qty,0)
 const discount=coupon==='WELCOME10'?Math.round(subtotal*0.1):0
 const delivery=cart.length===0||subtotal-discount>=FREE_OVER?0:DELIVERY
 const v:Ctx={cart,wish,orders,coupon,subtotal,discount,delivery,total:subtotal-discount+delivery,flash,notify,
  count:cart.reduce((a,l)=>a+l.qty,0),
  add:l=>{setCart(c=>{const i=c.findIndex(x=>x.slug===l.slug&&x.size===l.size);if(i<0)return[...c,l];const n=[...c];n[i]={...n[i],qty:n[i].qty+l.qty};return n});notify('Added to bag')},
  setQty:(s,z,q)=>setCart(c=>c.map(x=>x.slug===s&&x.size===z?{...x,qty:Math.max(1,Math.min(10,q))}:x)),
  remove:(s,z)=>setCart(c=>c.filter(x=>!(x.slug===s&&x.size===z))),clear:()=>{setCart([]);setCoupon('')},
  toggleWish:s=>{setWish(w=>w.includes(s)?w.filter(x=>x!==s):[...w,s])},
  addOrder:o=>setOrders(x=>[o,...x]),
  applyCoupon:c=>{const ok=c.trim().toUpperCase()==='WELCOME10';setCoupon(ok?'WELCOME10':'');return ok}}
 return <C.Provider value={v}>{children}</C.Provider>}
