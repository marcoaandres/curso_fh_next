'use client';

import { useState } from "react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import clsx from "clsx";
import { login, registerUser } from "@/actions";

interface formImputs {
    name: string;
    email: string;
    password: string;
}

export const RegisterForm = () => {
    const [errorMessage, setErrorMessage] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm<formImputs>();

    const onSubmit: SubmitHandler<formImputs> = async (data) => {
        setErrorMessage('');
        const {name, email, password} = data;

        const resp = await registerUser(name, email, password);

        if(!resp.ok) {
            setErrorMessage(resp.message);
        }

        const loginResponse = await login(email.toLowerCase(), password);
        if(!loginResponse.ok) {
            setErrorMessage(loginResponse.message);
        }

        window.location.replace('/');



    }

  return (
    
    <form onSubmit={ handleSubmit(onSubmit) } className="flex flex-col">
        <label htmlFor="name">Nombre Completo</label>
        <input
          className={
            clsx(
                "px-5 py-2 border bg-gray-200 rounded mb-5",
                {
                    'border-red-500 mb-2!': errors.name
                }
            )
          }
          type="text"
          {...register('name', { required: true })}
        />
        {
            errors.name && <span className="text-sm text-red-500 mb-5">El nombre es obligatorio</span>
        }

        <label htmlFor="email">Correo</label>
        <input
          className={
            clsx(
                "px-5 py-2 border bg-gray-200 rounded mb-5",
                {
                    'border-red-500 mb-2!': errors.email
                }
            )
          }
          type="email"
          {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
        />
        {
            errors.email && <span className="text-sm text-red-500 mb-5">El correo es obligatorio</span>
        }

        <label htmlFor="password">Contraseña</label>
        <input
          className={
            clsx(
                "px-5 py-2 border bg-gray-200 rounded mb-5",
                {
                    'border-red-500 mb-2!': errors.password
                }
            )
          }
          type="password"
            {...register('password', { required: true, minLength: 6 })}
        />
        {
            errors.password && <span className="text-sm text-red-500 mb-5">La contraseña es obligatoria</span>
        }

        {
            errorMessage && <span className="text-sm text-red-500 mb-5">{errorMessage}</span>
        }
        <button className="btn-primary" type="submit">Crear cuenta</button>

        {/* divisor line */}
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link href="/auth/login" className="btn-secondary text-center">
          Ingresar
        </Link>
      </form>
      
  )
}
