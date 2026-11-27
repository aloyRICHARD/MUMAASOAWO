import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import type { Gender } from '../types'
export default function Shop({gender,onlyNew}:{gender?:Gender;onlyNew?:boolean}){
 const [sp]=useSearchParams(); const q=(sp.get('q')||'').toLowerCase()
 const [price,setPrice]=useState('all'); const [size,setSize]=useState(''); const [col,setCol]=useState(''); const [sort,setSort]=useState('featured'); const [open,setOpen]=useState(false)
 let list=products.filter(p=>(!gender||p.gender===gender)&&(!onlyNew||p.tag==='New')&&(!q||p.name.toLowerCase().includes(q)||p.colour.toLowerCase().includes(q))
  &&(price==='all'||(price==='lo'?p.price<60000:price==='mid'?p.price>=60000&&p.price<=90000:p.price>90000))&&(!size||p.sizes.includes(size))&&(!col||p.colour===col))
 if(sort==='lo')list=[...list].sort((a,b)=>a.price-b.price); if(sort==='hi')list=[...list].sort((a,b)=>b.price-a.price)
 const cols=[...new Set(products.map(p=>p.colour))]
 const sel='input w-auto'
 return(<div className="max-w-7xl mx-auto px-4 pt-6">
  <h1 className="text-4xl">{q?`Results for "${q}"`:onlyNew?'New arrivals':gender==='men'?"Men":gender==='women'?"Women":'Shop our collection'}</h1>
  <div className="flex flex-wrap items-center justify-between gap-3 mt-6 mb-4 border-y border-ink/10 py-3 text-sm">
   <span aria-live="polite">{list.length} product{list.length!==1&&'s'}</span>
   <button className="md:hidden btn-ghost py-2" onClick={()=>setOpen(!open)} aria-expanded={open}>Filters</button>
   <div className={(open?'flex':'hidden')+' md:flex flex-wrap gap-2 w-full md:w-auto'}>
    <select className={sel} aria-label="Price" value={price} onChange={e=>setPrice(e.target.value)}><option value="all">Any price</option><option value="lo">Under 60,000</option><option value="mid">60,000 – 90,000</option><option value="hi">Over 90,000</option></select>
    <select className={sel} aria-label="Size" value={size} onChange={e=>setSize(e.target.value)}><option value="">Any size</option>{['S','M','L','XL','XXL'].map(s=><option key={s}>{s}</option>)}</select>
    <select className={sel} aria-label="Colour" value={col} onChange={e=>setCol(e.target.value)}><option value="">Any colour</option>{cols.map(c=><option key={c}>{c}</option>)}</select>
    <select className={sel} aria-label="Sort" value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Featured</option><option value="lo">Price: low to high</option><option value="hi">Price: high to low</option></select></div></div>
  {list.length?<div className="grid grid-cols-2 md:grid-cols-4 gap-4">{list.map(p=><ProductCard key={p.slug} p={p}/>)}</div>:<p className="py-10 text-center text-muted">No products match. Try clearing a filter.</p>}</div>)}
