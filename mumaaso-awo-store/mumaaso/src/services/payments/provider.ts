import type { Provider } from '../../types'
export interface PaymentRequest{orderId:string;provider:Provider;phone:string;amount:number}
export interface PaymentResult{status:'confirmed'|'simulated_success'|'failed'|'cancelled';reference:string}
export interface PaymentProvider{readonly simulated:boolean;requestPayment(r:PaymentRequest,signal?:AbortSignal):Promise<PaymentResult>}
/** DEV ONLY. Never returns 'confirmed'. Replace with real MTN MoMo / Airtel Money adapters that
 *  return 'confirmed' only after a trusted server-side callback. No credentials exist here. */
export const simulatedProvider:PaymentProvider={simulated:true,requestPayment:(r,signal)=>new Promise((res,rej)=>{
 const t=setTimeout(()=>res({status:r.phone.endsWith('0')?'failed':'simulated_success',reference:'SIM-'+Date.now()}),3500)
 signal?.addEventListener('abort',()=>{clearTimeout(t);rej(new DOMException('cancelled','AbortError'))})})}
export const paymentProvider:PaymentProvider=simulatedProvider
