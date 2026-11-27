import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
type Mode='light'|'dark'|'system'
const C=createContext<{mode:Mode;cycle:()=>void}>({mode:'system',cycle:()=>{}})
export const useTheme=()=>useContext(C)
const get=():Mode=>{try{const m=localStorage.getItem('m_theme');return m==='light'||m==='dark'?m:'system'}catch{return 'system'}}
export function ThemeProvider({children}:{children:ReactNode}){
 const [mode,setMode]=useState<Mode>(get)
 useEffect(()=>{const mq=matchMedia('(prefers-color-scheme: dark)')
  const apply=()=>document.documentElement.classList.toggle('dark',mode==='dark'||(mode==='system'&&mq.matches))
  apply();try{localStorage.setItem('m_theme',mode)}catch{}
  mq.addEventListener('change',apply);return()=>mq.removeEventListener('change',apply)},[mode])
 const cycle=()=>setMode(m=>m==='light'?'dark':m==='dark'?'system':'light')
 return <C.Provider value={{mode,cycle}}>{children}</C.Provider>}
