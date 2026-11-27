import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../context/Store'
import { ugx, validPhone, phoneProvider } from '../utils/format'
import { paymentProvider } from '../services/payments/provider'
import type { PayStatus, Provider } from '../types'
const districts=['Kampala','Wakiso','Mukono','Entebbe','Jinja','Mbarara','Gulu','Other']
export default function Checkout(){
 const s=useStore(); const go=useNavigate()
 const [f,setF]=useState({name:'',phone:'',email:'',address:'',district:'Kampala',city:'',notes:''}); const [prov,setProv]=useState<Provider>('mtn')
 const [e,setE]=useState<Record<string,string>>({}); const [st,setSt]=useState<PayStatus>('awaiting'); const [ord]=useState('MA-'+new Date().getFullYear()+'-'+Math.floor(1000+Math.random()*9000))
 const ab=useRef<AbortController|null>(null)
 useEffect(()=>()=>ab.current?.abort(),[])
 if(!s.cart.length&&st==='awaiting')return <div className="py-12 text-center"><h1 className="text-3xl">Your bag is empty</h1><Link to="/shop" className="btn mt-6">Shop</Link></div>
 const set=(k:string)=>(ev:{target:{value:string}})=>setF({...f,[k]:ev.target.value})
 const validate=()=>{const x:Record<string,string>={}
  if(f.name.trim().length<2)x.name='Enter your full name.'
  if(!validPhone(f.phone))x.phone='Enter a valid Ugandan number, e.g. 0772 122 695.'
  else if(phoneProvider(f.phone)!==prov)x.phone=`This number does not look like an ${prov==='mtn'?'MTN':'Airtel'} number.`
  if(!/\S+@\S+\.\S+/.test(f.email))x.email='Enter a valid email.'
  if(f.address.trim().length<4)x.address='Enter your delivery address.'
  if(f.city.trim().length<2)x.city='Enter your city or town.'
  setE(x);return !Object.keys(x).length}
 const pay=async()=>{if(!validate())return
  ab.current=new AbortController(); setSt('sent'); await new Promise(r=>setTimeout(r,1200)); setSt('processing')
  try{const r=await paymentProvider.requestPayment({orderId:ord,provider:prov,phone:f.phone,amount:s.total},ab.current.signal)
   if(r.status==='failed'){setSt('failed');return}
   s.addOrder({id:ord,lines:s.cart,total:s.total,provider:prov,phone:f.phone,name:f.name,address:`${f.address}, ${f.city}, ${f.district}`,date:new Date().toISOString(),simulated:r.status!=='confirmed'})
   setSt('successful'); s.clear(); go('/order/'+ord)
  }catch{setSt('cancelled')}}
 const busy=st==='sent'||st==='processing'
 const fld=(k:keyof typeof f,l:string,t='text')=><label className="block text-sm">{l}<input className="input mt-1" type={t} value={f[k]} onChange={set(k)} aria-invalid={!!e[k]}/>{e[k]&&<span className="err block" role="alert">{e[k]}</span>}</label>
 return(<div className="max-w-5xl mx-auto px-4 pt-6 grid md:grid-cols-[1.4fr_1fr] gap-6"><div className="space-y-4"><h1 className="text-3xl">Checkout</h1>
  {fld('name','Full name')}{fld('phone','Mobile money number','tel')}{fld('email','Email','email')}{fld('address','Delivery address')}
  <div className="grid grid-cols-2 gap-3"><label className="block text-sm">District<select className="input mt-1" value={f.district} onChange={set('district')}>{districts.map(d=><option key={d}>{d}</option>)}</select></label>{fld('city','City or town')}</div>
  <label className="block text-sm">Delivery instructions (optional)<textarea className="input mt-1" rows={2} value={f.notes} onChange={set('notes')}/></label></div>
 <aside className="space-y-4 h-fit"><h2 className="text-xl">Payment method</h2>
  <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Payment method">{(['mtn','airtel'] as Provider[]).map(p=><button key={p} role="radio" aria-checked={prov===p} disabled={busy} onClick={()=>setProv(p)} className={'p-4 border-2 text-center '+(prov===p?'border-ink':'border-stone/50')}><div className={'font-display font-bold text-lg px-2 py-1 inline-block '+(p==='mtn'?'bg-yellow-400 text-black':'bg-red-600 text-white')}>{p==='mtn'?'MTN':'airtel'}</div><div className="text-xs mt-1">{p==='mtn'?'Mobile Money':'Money'}</div></button>)}</div>
  <div className="bg-surface p-4 text-sm space-y-1 border border-stone/40"><div className="flex justify-between"><span>Subtotal</span><span>{ugx(s.subtotal)}</span></div><div className="flex justify-between"><span>Delivery</span><span>{s.delivery?ugx(s.delivery):'Free'}</span></div><div className="flex justify-between font-bold text-lg pt-2"><span>Total</span><span>{ugx(s.total)}</span></div></div>
  <div role="status" className="text-sm border border-ink/20 p-3 bg-lime/20">
   {st==='awaiting'&&'Enter your details, then send the payment request.'}
   {st==='sent'&&`Payment request sent to ${f.phone}.`}{st==='processing'&&`Processing. Approve the prompt on ${f.phone} for ${ugx(s.total)}.`}
   {st==='failed'&&'Payment failed. Check your balance and try again.'}{st==='cancelled'&&'Payment cancelled.'}</div>
  {busy?<button className="btn-ghost w-full" onClick={()=>ab.current?.abort()}>Cancel payment</button>:<button className="btn w-full" onClick={pay}>{st==='failed'||st==='cancelled'?'Retry payment':'Send payment request'}</button>}
  <p className="text-xs text-muted">Development mode: payments are simulated. No money is taken and no real MTN or Airtel request is sent. Numbers ending in 0 simulate a failure.</p></aside></div>)}
