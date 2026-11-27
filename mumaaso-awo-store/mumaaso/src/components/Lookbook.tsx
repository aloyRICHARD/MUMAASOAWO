import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Pause, Play } from 'lucide-react'
export default function Lookbook(){
 const v=useRef<HTMLVideoElement>(null)
 const reduce=typeof matchMedia!=='undefined'&&matchMedia('(prefers-reduced-motion: reduce)').matches
 const [playing,setPlaying]=useState(!reduce)
 useEffect(()=>{const el=v.current;if(!el)return
  const io=new IntersectionObserver(([e])=>{if(!playing)return;e.isIntersecting?el.play().catch(()=>{}):el.pause()},{threshold:.3})
  io.observe(el);return()=>io.disconnect()},[playing])
 const toggle=()=>{const el=v.current;if(!el)return;if(el.paused){el.play().catch(()=>{});setPlaying(true)}else{el.pause();setPlaying(false)}}
 return(<section className="max-w-7xl mx-auto px-4 mt-10 grid md:grid-cols-2 gap-6 items-center">
  <div className="relative mx-auto w-full max-w-sm aspect-[9/16] bg-black overflow-hidden">
   <video ref={v} className="w-full h-full object-cover" muted loop playsInline preload="metadata" autoPlay={!reduce} poster="/video/lookbook-poster.webp" aria-label="Models wearing Kampala 256 sweatshirts in a Kampala scrapyard">
    <source src="/video/lookbook.webm" type="video/webm"/><source src="/video/lookbook.mp4" type="video/mp4"/></video>
   <button onClick={toggle} aria-label={playing?'Pause video':'Play video'} className="absolute bottom-3 right-3 glass rounded-full p-3">{playing?<Pause size={16}/>:<Play size={16}/>}</button></div>
  <div><h2 className="text-3xl md:text-4xl">Kampala 256, worn the way it was made.</h2>
   <p className="mt-3 text-muted max-w-md">Real people, real streets. See the sweatshirts and tees on the people who inspired them.</p>
   <Link to="/shop" className="btn mt-5">Shop the looks</Link></div></section>)}
