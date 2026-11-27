import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import type { Product } from '../types'
import { useStore } from '../context/Store'
import { ugx } from '../utils/format'
export default function ProductCard({p}:{p:Product}){
 const {wish,toggleWish}=useStore(); const on=wish.includes(p.slug)
 return(<div className="group pop relative">
  <Link to={`/product/${p.slug}`} className="pop-img block aspect-[3/4] overflow-hidden bg-stone/20 relative">
   <img src={p.images[0]} alt={p.name} loading="lazy" className="pop-zoom absolute inset-0 w-full h-full object-cover object-top"/>
   {p.images[1]&&<img src={p.images[1]} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover object-top opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>}
   {p.tag&&<span className={'absolute top-3 left-3 text-xs px-2 py-1 '+(p.tag==='New'?'bg-lime text-black':'bg-black text-paper')}>{p.tag}</span>}
  </Link>
  <button aria-label={on?'Remove from wishlist':'Add to wishlist'} aria-pressed={on} onClick={()=>toggleWish(p.slug)} className="absolute top-2 right-2 p-2 glass rounded-full"><Heart size={16} fill={on?'currentColor':'none'}/></button>
  <div className="pt-3 flex justify-between gap-2 text-sm"><Link to={`/product/${p.slug}`} className="font-medium">{p.name}</Link><span>{ugx(p.price)}</span></div>
  <span className="inline-block w-3 h-3 rounded-full border border-ink/30 mt-1" style={{background:p.hex}} title={p.colour}/>
 </div>)}
