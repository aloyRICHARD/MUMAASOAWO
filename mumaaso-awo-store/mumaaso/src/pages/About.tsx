import { Link } from 'react-router-dom'
export default function About(){
 return(<div className="max-w-5xl mx-auto px-4 pt-6 grid md:grid-cols-2 gap-6 items-center"><img src="/images/products/orange-tie-dye-tee/03-street.webp" alt="" className="aspect-[3/4] object-cover object-top w-full"/>
 <div><h1 className="text-4xl">Made in Kampala.</h1><p className="mt-4 text-muted">MUMAASO-AWO makes contemporary streetwear rooted in Kampala and the 256. Every piece is designed here and made in Uganda. (Placeholder copy: replace with the brand's real story.)</p><Link to="/shop" className="btn mt-6">Shop the collection</Link></div></div>)}
