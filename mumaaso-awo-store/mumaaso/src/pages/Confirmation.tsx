import { Link, useParams } from 'react-router-dom'
import { Check } from 'lucide-react'
import { useStore } from '../context/Store'
import { ugx } from '../utils/format'
export default function Confirmation(){
 const {id}=useParams(); const o=useStore().orders.find(x=>x.id===id)
 if(!o)return <div className="py-12 text-center"><h1 className="text-3xl">Order not found</h1><Link to="/account" className="btn mt-6">My orders</Link></div>
 return(<div className="max-w-md mx-auto py-10 px-4 text-center"><div className="w-16 h-16 rounded-full bg-lime text-black grid place-items-center mx-auto"><Check/></div>
 <h1 className="text-3xl mt-6">Order received</h1><p className="mt-2">Order <b>{o.id}</b> · {ugx(o.total)}</p>
 {o.simulated&&<p className="mt-4 text-sm border border-ink p-3">Simulated payment. This was a test: no money was paid and MUMAASO-AWO has not confirmed it.</p>}
 <div className="flex gap-3 justify-center mt-8"><Link to="/account" className="btn">View orders</Link><Link to="/shop" className="btn-ghost">Continue shopping</Link></div></div>)}
