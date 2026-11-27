import { Link } from 'react-router-dom'
import { useState } from 'react'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import Lookbook from '../components/Lookbook'
export default function Home(){
 const [done,setDone]=useState(false); const [em,setEm]=useState('')
 const best=products.filter(p=>p.tag==='Best Seller'), fresh=products.filter(p=>p.tag==='New')
 const tile=(to:string,img:string,t:string)=><Link to={to} className="pop relative aspect-[4/5] overflow-hidden block bg-black"><img src={img} alt="" className="w-full h-full object-cover object-top"/><span className="absolute bottom-0 inset-x-0 p-4 text-paper font-display text-2xl bg-gradient-to-t from-black/70 to-transparent">{t}</span></Link>
 return(<>
 <section className="relative h-[80vh] min-h-[520px] bg-black"><img src="/images/products/orange-tie-dye-tee/02-full.webp" alt="Model in orange KLA 256 tee on Bombo Road" className="absolute inset-0 w-full h-full object-cover object-[50%_25%] opacity-90"/>
  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent"/>
  <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col justify-end pb-10 text-paper"><h1 className="font-display font-bold text-5xl md:text-7xl leading-[0.95]">Style that<br/>speaks.</h1>
  <p className="mt-4 max-w-sm">Contemporary fashion for the bold and confident, made in Kampala.</p><Link to="/shop" className="btn-lime mt-6 self-start">Shop the collection</Link></div></section>
 <section className="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-3 gap-3">{tile('/men','/images/products/red-kampala-tee/02-duo.webp',"Men")}{tile('/women','/images/products/grey-kampala-sweatshirt/01-front.webp',"Women")}{tile('/new','/images/products/black-kla-tee/01-front.webp',"New")}</section>
 <section className="max-w-7xl mx-auto px-4 mt-8"><div className="flex justify-between items-end mb-3"><h2 className="text-2xl">New arrivals</h2><Link to="/new" className="text-sm underline">View all</Link></div>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{fresh.map(p=><ProductCard key={p.slug} p={p}/>)}</div></section>
 <section className="max-w-7xl mx-auto px-4 mt-8 grid md:grid-cols-[1.4fr_1fr] gap-4">
  <div className="relative min-h-[360px] bg-black overflow-hidden"><img src="/images/products/grey-kampala-sweatshirt/03-van-close.webp" alt="" className="absolute inset-0 w-full h-full object-cover opacity-80"/><div className="relative p-8 text-paper max-w-xs"><h2 className="text-3xl">Premium quality. Lasting style.</h2><Link to="/shop" className="btn-lime mt-5">Shop now</Link></div></div>
  <div className="bg-lime text-black p-8 flex flex-col justify-between min-h-[260px]"><h2 className="text-3xl">Made in Uganda.<br/>For Africa.</h2><Link to="/about" className="btn self-start">Our story</Link></div></section>
 <Lookbook/>
 <section className="max-w-7xl mx-auto px-4 mt-8"><div className="flex justify-between items-end mb-3"><h2 className="text-2xl">Best sellers</h2><Link to="/shop" className="text-sm underline">View all</Link></div>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{best.map(p=><ProductCard key={p.slug} p={p}/>)}</div></section>
 <section className="max-w-3xl mx-auto px-4 mt-10 text-center"><h2 className="text-2xl">Join our newsletter</h2>
  {done?<p className="mt-4" role="status">You're on the list.</p>:<form className="mt-4 flex gap-2" onSubmit={e=>{e.preventDefault();if(/\S+@\S+\.\S+/.test(em))setDone(true)}}><input className="input" type="email" value={em} onChange={e=>setEm(e.target.value)} placeholder="Email address" aria-label="Email address"/><button className="btn">Subscribe</button></form>}</section></>)}
