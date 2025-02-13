import { redirect } from "next/navigation"



export default function HomePage() {

  // * redireccionar a otra página directamente, sin pasar por el '/'
redirect('/dashboard/main')
    
}
