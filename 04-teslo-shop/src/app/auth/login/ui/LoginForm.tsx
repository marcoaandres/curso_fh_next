'use client';

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { IoInformationCircle } from "react-icons/io5";
import { authenticate } from "@/actions";

export const LoginForm = () => {
  const [message, formAction, isPending] = useActionState(authenticate, undefined);

  useEffect(() => {
    if(message === 'Success') {
      window.location.replace('/'); // Redirige a la página principal después de un inicio de sesión exitoso
    }
    
  }, [message])
  

  return (
    <form action={ formAction } className="flex flex-col">
        <label htmlFor="email">Correo electrónico</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="email"
          name="email"
        />

        <label htmlFor="password">Contraseña</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="password"
          name="password"
        />

        {(message && message !== 'Success') && (
            <div className="flex items-center gap-2 mb-5">
              <IoInformationCircle className="h-5 w-5 text-red-500" />
              <span className="text-sm text-red-500">{message}</span>
            </div>
          )}

        <button type="submit" className={`${isPending ? 'btn-disabled' : 'btn-primary'}`} disabled={isPending}>
          {isPending ? 'Cargando...' : 'Iniciar sesión'}
        </button>

        {/* divisor line */}
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link href="/auth/new-account" className="btn-secondary text-center">
          Crear una nueva cuenta
        </Link>
      </form>
  )
}
