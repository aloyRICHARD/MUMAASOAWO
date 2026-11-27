import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Heart, MessageCircle } from 'lucide-react'
import { getProduct, products } from '../data/products'
import { useStore } from '../context/Store'
import { ugx, waLink } from '../utils/format'
import ProductCard from '../components/ProductCard'
export default function ProductPage(){
 const {slug}=useParams(); const p=getProduct(slug); const {add,wish,toggleWish}=useStore()
 const [img,setImg]=useState(0); const [size,setSize]=useState(''); const [qty,setQty]=useState(1); const [err,setErr]=useState(false); const [guide,setGuide]=useState(false)
 if(!p)return <div className="p-20 text-center"><h1 className="text-3xl">Product not found</h1><Link className="btn mt-6" to="/shop">Back to shop</Link></div>
 const addBag=()=>{if(!size){setErr(true);return}add({slug:p.slug,size,qty})}
 const msg=`Hi MUMAASO-AWO, I'd like to order: ${p.name} (${p.colour})${size?`, size ${size}`:''}, qty ${qty} - ${ugx(p.price*qty)}.`
 return(<div className="max-w-7xl mx-auto px-4 pt-8 pb-24">
  <div className="grid md:grid-cols-2 gap-6">
   <div className="flex flex-col-reverse md:flex-row gap-3"><div className="flex md:flex-col gap-2">{p.images.map((s,i)=><button key={s} aria-label={`Image ${i+1}`} onClick={()=>setImg(i)} className={'w-16 aspect-[3/4] border '+(i===img?'border-ink':'border-transparent')}><img src={s} alt="" className="w-full h-full object-cover object-top"/></button>)}</div>
   <div className="flex-1 aspect-[3/4] bg-stone/20"><img src={p.images[img]} alt={p.name} className="w-full h-full object-cover object-top"/></div></div>
   <div><h1 className="text-3xl">{p.name}</h1><p className="text-2xl mt-2">{ugx(p.price)}</p><p className="mt-4 text-muted max-w-md">{p.description}</p>
    <div className="mt-6 text-sm">Colour: <b>{p.colour}</b> <span className="inline-block w-4 h-4 rounded-full border align-middle ml-1" style={{background:p.hex}}/></div>
    <div className="mt-5 flex justify-between text-sm"><span>Size</span><button className="underline" onClick={()=>setGuide(true)}>Size guide</button></div>
    <div className="flex gap-2 mt-2" role="radiogroup" aria-label="Size">{p.sizes.map(s=><button key={s} role="radio" aria-checked={size===s} onClick={()=>{setSize(s);setErr(false)}} className={'w-12 h-12 border text-sm '+(size===s?'bg-ink text-ivory border-ink':'border-stone bg-surface text-ink')}>{s}</button>)}</div>
    {err&&<p className="err" role="alert">Select a size to continue.</p>}
    <p className="mt-4 text-sm flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-lime"/>{p.stock>0?'In stock':'Out of stock'}</p>
    <div className="flex items-center gap-3 mt-4"><button aria-label="Decrease" className="w-10 h-10 border" onClick={()=>setQty(Math.max(1,qty-1))}>−</button><span aria-live="polite">{qty}</span><button aria-label="Increase" className="w-10 h-10 border" onClick={()=>setQty(Math.min(10,qty+1))}>+</button></div>
    <div className="grid gap-2 mt-5 max-w-md"><button className="btn" onClick={addBag} disabled={p.stock<1}>Add to bag</button>
     <button className="btn-ghost" onClick={()=>toggleWish(p.slug)}><Heart size={16} fill={wish.includes(p.slug)?'currentColor':'none'}/>{wish.includes(p.slug)?'In wishlist':'Add to wishlist'}</button>
     <a className="btn-lime" href={waLink(msg)} target="_blank" rel="noreferrer"><MessageCircle size={16}/>Order on WhatsApp</a></div>
    <ul className="mt-8 text-sm text-muted list-disc pl-5 space-y-1">{p.details.map(d=><li key={d}>{d}</li>)}</ul>
    <p className="mt-6 text-sm"><b>Delivery:</b> Free above UGX 200,000, otherwise UGX 10,000. Delivery timing to be confirmed by MUMAASO-AWO.</p></div></div>
  <h2 className="text-2xl mt-8 mb-4">You may also like</h2><div className="grid grid-cols-2 md:grid-cols-4 gap-4">{products.filter(x=>x.slug!==p.slug).slice(0,4).map(x=><ProductCard key={x.slug} p={x}/>)}</div>
  <div className="md:hidden fixed bottom-0 inset-x-0 z-30 glass p-3 flex gap-2"><button className="btn flex-1" onClick={addBag}>Add to bag · {ugx(p.price*qty)}</button></div>
  {guide&&<div className="fixed inset-0 z-50 bg-ink/50 grid place-items-center p-4" role="dialog" aria-label="Size guide"><div className="glass p-6 max-w-sm w-full"><h2 className="text-xl mb-3">Size guide</h2><p className="text-sm text-muted">Relaxed unisex fit. Measurements to be supplied by MUMAASO-AWO. Unsure? Message us on WhatsApp.</p><button className="btn mt-4" onClick={()=>setGuide(false)}>Close</button></div></div>}
 </div>)}
