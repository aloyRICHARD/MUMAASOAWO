import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import { useStore } from '../context/Store'
import { getProduct } from '../data/products'
import { ugx, waLink } from '../utils/format'
export default function Cart(){
 const s=useStore(); const [code,setCode]=useState(''); const [msg,setMsg]=useState('')
 if(!s.cart.length)return <div className="max-w-xl mx-auto py-12 text-center px-4"><h1 className="text-3xl">Your bag is empty</h1><p className="text-muted mt-2">Add something you like and it will wait here.</p><Link to="/shop" className="btn mt-6">Start shopping</Link></div>
 const wa=waLink('Hi MUMAASO-AWO, I want to order:\n'+s.cart.map(l=>{const p=getProduct(l.slug)!;return `- ${p.name} (${p.colour}), size ${l.size} x${l.qty}`}).join('\n')+`\nTotal: ${ugx(s.total)}`)
 return(<div className="max-w-5xl mx-auto px-4 pt-6 grid md:grid-cols-[1.5fr_1fr] gap-6"><div><h1 className="text-3xl mb-4">Your bag ({s.count})</h1>
 {s.cart.map(l=>{const p=getProduct(l.slug)!;return(<div key={l.slug+l.size} className="flex gap-4 py-4 border-b border-ink/10"><img src={p.images[0]} alt={p.name} className="w-24 aspect-[3/4] object-cover object-top"/>
  <div className="flex-1 text-sm"><div className="flex justify-between"><Link to={`/product/${p.slug}`} className="font-medium">{p.name}</Link><button aria-label={`Remove ${p.name}`} onClick={()=>s.remove(l.slug,l.size)}><Trash2 size={16}/></button></div>
  <div className="text-muted">{p.colour} / {l.size}</div><div className="flex justify-between items-center mt-3"><div className="flex items-center gap-3"><button aria-label="Decrease" className="w-8 h-8 border" onClick={()=>s.setQty(l.slug,l.size,l.qty-1)}>−</button>{l.qty}<button aria-label="Increase" className="w-8 h-8 border" onClick={()=>s.setQty(l.slug,l.size,l.qty+1)}>+</button></div><b>{ugx(p.price*l.qty)}</b></div></div></div>)})}
 <Link to="/shop" className="inline-block mt-6 underline text-sm">Continue shopping</Link></div>
 <aside className="space-y-3 text-sm h-fit"><div className="flex justify-between"><span>Subtotal</span><span>{ugx(s.subtotal)}</span></div>
  {s.discount>0&&<div className="flex justify-between"><span>Coupon WELCOME10</span><span>−{ugx(s.discount)}</span></div>}
  <div className="flex justify-between"><span>Delivery</span><span>{s.delivery?ugx(s.delivery):'Free'}</span></div>
  <div className="flex justify-between text-lg font-display font-bold border-t border-ink pt-3"><span>Total</span><span>{ugx(s.total)}</span></div>
  <Link to="/checkout" className="btn w-full">Proceed to checkout</Link><a href={wa} target="_blank" rel="noreferrer" className="btn-lime w-full">Order on WhatsApp</a>
  <form className="pt-4 flex gap-2" onSubmit={e=>{e.preventDefault();setMsg(s.applyCoupon(code)?'Coupon applied.':'Invalid code.')}}><input className="input" value={code} onChange={e=>setCode(e.target.value)} placeholder="Coupon code" aria-label="Coupon code"/><button className="btn">Apply</button></form>
  {msg&&<p role="status" className="text-xs">{msg}</p>}</aside></div>)}
