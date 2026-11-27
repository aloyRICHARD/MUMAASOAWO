import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Search, User, Heart, ShoppingBag, Menu, X, MessageCircle, Sun, Moon, Monitor } from 'lucide-react'
import { useTheme } from '../context/Theme'
import { useStore } from '../context/Store'
import { waLink } from '../utils/format'
const nav=[['Home','/'],['Shop','/shop'],['Men','/men'],['Women','/women'],['New Arrivals','/new'],['About','/about']]
export default function Layout(){
 const {count,wish,flash}=useStore(); const {mode,cycle}=useTheme(); const TI=mode==='dark'?Moon:mode==='light'?Sun:Monitor; const [open,setOpen]=useState(false); const [q,setQ]=useState<string|null>(null)
 const loc=useLocation(); const go=useNavigate()
 useEffect(()=>{setOpen(false);window.scrollTo(0,0)},[loc.pathname])
 const link=({isActive}:{isActive:boolean})=>'text-sm '+(isActive?'underline underline-offset-8':'hover:underline underline-offset-8')
 return(<div className="min-h-screen flex flex-col">
 <div className="bg-black text-paper text-xs text-center py-2 px-3">Free delivery on orders above UGX 200,000</div>
 <header className="sticky top-0 z-40 glass"><div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4">
  <button className="md:hidden p-2" aria-label="Open menu" onClick={()=>setOpen(true)}><Menu size={22}/></button>
  <Link to="/" className="font-display font-bold tracking-tight text-lg">MUMAASO-AWO</Link>
  <nav className="hidden md:flex gap-7" aria-label="Main">{nav.map(([n,p])=><NavLink key={p} to={p} end={p==='/'} className={link}>{n}</NavLink>)}</nav>
  <div className="flex items-center gap-1">
   <button className="p-2" aria-label={`Theme: ${mode}. Click to change`} title={`Theme: ${mode}`} onClick={cycle}><TI size={20}/></button>
   <button className="p-2" aria-label="Search" onClick={()=>setQ('')}><Search size={20}/></button>
   <Link className="p-2 hidden sm:block" to="/account" aria-label="Account"><User size={20}/></Link>
   <Link className="p-2 relative hidden sm:block" to="/wishlist" aria-label="Wishlist"><Heart size={20}/>{wish.length>0&&<span className="absolute top-0 right-0 text-[10px] bg-lime text-black rounded-full w-4 h-4 grid place-items-center">{wish.length}</span>}</Link>
   <Link className="p-2 relative" to="/cart" aria-label="Shopping bag"><ShoppingBag size={20}/>{count>0&&<span className="absolute top-0 right-0 text-[10px] bg-lime text-black rounded-full w-4 h-4 grid place-items-center">{count}</span>}</Link>
  </div></div></header>
 {open&&<div className="fixed inset-0 z-50 glass p-6 flex flex-col gap-5" role="dialog" aria-label="Menu">
  <button className="self-end p-2" aria-label="Close menu" onClick={()=>setOpen(false)}><X size={24}/></button>
  {[...nav,['Account','/account'],['Wishlist','/wishlist'],['Bag','/cart']].map(([n,p])=><Link key={p} to={p} className="font-display text-3xl">{n}</Link>)}</div>}
 {q!==null&&<div className="fixed inset-0 z-50 glass p-6" role="dialog" aria-label="Search"><div className="max-w-2xl mx-auto">
  <button className="float-right p-2" aria-label="Close search" onClick={()=>setQ(null)}><X size={24}/></button>
  <form className="clear-both pt-6" onSubmit={e=>{e.preventDefault();go('/shop?q='+encodeURIComponent(q));setQ(null)}}>
  <input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder="Search products" className="input text-lg"/></form></div></div>}
 <main className="flex-1"><Outlet/></main>
 <a href={waLink('Hi MUMAASO-AWO, I would like to order.')} target="_blank" rel="noreferrer" className="fixed bottom-4 right-4 z-30 glass rounded-full px-4 py-3 flex items-center gap-2 text-sm font-medium"><MessageCircle size={18}/>Order on WhatsApp</a>
 {flash&&<div role="status" className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-ink text-ivory text-sm px-5 py-3">{flash}</div>}
 <footer className="bg-black text-paper mt-10"><div className="max-w-7xl mx-auto px-4 py-12 grid gap-6 md:grid-cols-4 text-sm">
  <div><div className="font-display font-bold text-lg">MUMAASO-AWO</div><p className="text-stone mt-2">Made in Uganda.</p></div>
  <div><div className="font-medium mb-2">Shop</div>{nav.slice(1,5).map(([n,p])=><Link key={p} className="block text-stone py-1" to={p}>{n}</Link>)}</div>
  <div><div className="font-medium mb-2">Account</div><Link className="block text-stone py-1" to="/account">My orders</Link><Link className="block text-stone py-1" to="/wishlist">Wishlist</Link><Link className="block text-stone py-1" to="/cart">Bag</Link></div>
  <div><div className="font-medium mb-2">Contact</div><a className="block text-stone py-1" href={waLink('Hi MUMAASO-AWO')}>WhatsApp 0772 122 695</a><a className="block text-stone py-1" href="tel:+256772122695">Call 0772 122 695</a></div>
 </div></footer></div>)}
