export type Gender='men'|'women'
export interface Product{slug:string;name:string;price:number;gender:Gender;colour:string;hex:string;sizes:string[];images:string[];tag?:'New'|'Best Seller';description:string;details:string[];stock:number}
export interface CartLine{slug:string;size:string;qty:number}
export type Provider='mtn'|'airtel'
export type PayStatus='awaiting'|'sent'|'processing'|'successful'|'failed'|'cancelled'
export interface Order{id:string;lines:CartLine[];total:number;provider:Provider;phone:string;name:string;address:string;date:string;simulated:boolean}
