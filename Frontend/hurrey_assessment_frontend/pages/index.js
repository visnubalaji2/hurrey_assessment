

import { Router, useRouter } from 'next/router';
import UserContext from "@/context/UserContext";
import { useContext,useEffect } from 'react';
export default function Home() {
  const router=useRouter()
  useEffect(()=>{
    let token=localStorage.getItem('token')
    if(!token){
      router.push('/login')
    }else{
      router.push('/detection')
    }
  },[])
 
  return (
   <>
   </>
  );
}
