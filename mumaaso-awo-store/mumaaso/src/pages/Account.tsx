import { Link } from 'react-router-dom'
import { useStore } from '../context/Store'
import { ugx } from '../utils/format'
export default function Account(){
 const {orders,wish}=useStore()
 return(<div className="max-w-3xl mx-auto px-4 pt-6"><h1 className="text-3xl">My account</h1><p className="text-muted mt-1">Orders and wishlist are saved on this device. Sign-in comes with the backend.</p>
 <div className="flex gap-3 mt-4"><Link to="/wishlist" className="btn-ghost">Wishlist ({wish.length})</Link></div><h2 className="text-xl mt-10 mb-3">Orders</h2>
 {orders.length?orders.map(o=><Link key={o.id} to={'/order/'+o.id} className="flex justify-between border-b border-ink/10 py-4 text-sm"><span><b>{o.id}</b><br/><span className="text-muted">{new Date(o.date).toLocaleDateString('en-UG',{dateStyle:'medium'})}{o.simulated&&' · simulated'}</span></span><span>{ugx(o.total)}</span></Link>):<p className="text-muted">No orders yet.</p>}</div>)}
