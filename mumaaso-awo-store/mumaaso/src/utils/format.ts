export const ugx = (n: number) => 'UGX ' + n.toLocaleString('en-UG')
export const WA = '256772122695'
export const waLink = (msg: string) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`
export const FREE_OVER = 200000, DELIVERY = 10000
const rx = /^(?:\+256|0)(7\d{8}|39\d{7})$/
export const validPhone = (p: string) => rx.test(p.replace(/\s/g, ''))
export const phoneProvider = (p: string) => { const d = p.replace(/\s/g,'').replace(/^\+256/,'0'); if (/^0(77|78|76|39)/.test(d)) return 'mtn'; if (/^0(70|75|74)/.test(d)) return 'airtel'; return null }
