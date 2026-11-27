import { Link } from 'react-router-dom'
import { useStore } from '../context/Store'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
export default function Wishlist(){
 const {wish}=useStore(); const list=products.filter(p=>wish.includes(p.slug))
 return(<div className="max-w-7xl mx-auto px-4 pt-6"><h1 className="text-3xl mb-4">Wishlist ({list.length})</h1>
 {list.length?<div className="grid grid-cols-2 md:grid-cols-4 gap-4">{list.map(p=><ProductCard key={p.slug} p={p}/>)}</div>:<div className="py-10 text-center"><p className="text-muted">Tap the heart on any product to save it here.</p><Link to="/shop" className="btn mt-6">Browse products</Link></div>}</div>)}
