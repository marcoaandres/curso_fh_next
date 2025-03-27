'use client'

import { useSession } from "next-auth/react";
import { useEffect } from "react";


export default function ProfilePage() {

    // hook para tomar la sesion del usuario con next-auth

    const {data: session} = useSession();

    useEffect(() => {
      console.log(session)
    }, [session])
    
  return (
    <div>
      <p>Name: {session?.user?.name}</p>
      <p>Email: {session?.user?.email}</p>
      <p>Url Image: {session?.user?.image}</p>
      <p>Roles: {session?.user?.roles?.join(',')}</p>
    </div>
  );
}