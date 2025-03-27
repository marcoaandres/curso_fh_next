import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { Adapter }  from 'next-auth/adapters';
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from '@auth/prisma-adapter';
import CredentialsProvider from "next-auth/providers/credentials";
import { signInEmailPassword } from "@/auth/actions/auth-actions";


const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {

  // adaptador
  adapter: PrismaAdapter(prisma) as Adapter,
  session: { strategy: "jwt" },

  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Correo", type: "email", placeholder: "usuario@email.com" },
        password: { label: "Contraseña", type: "password", placeholder: "****" }
      },
      async authorize(credentials) {
        const user = await signInEmailPassword( credentials!.email, credentials!.password );
        console.log("---------- route:");
        console.log(user);

        if (user) {
          console.log("OK");
          return user;
        }else{
          return null;
        }
      }
    })
  ],

  callbacks: {
    async signIn({user, account, profile, email, credentials}){
      console.log("signIn");
      return true;
    },
    async jwt({ token, user, account, profile }){
      console.log({token});
    //consulta a la bbdd con prisma
      const dbUser = await prisma.user.findUnique({ where: { email: token.email ?? 'no-email' } });

      console.log("jwt");
      console.log({dbUser})
      token.roles = dbUser?.roles ?? ['no-roles'];
      token.id = dbUser?.id ?? 'no-uuid';
      return token;
    },
    
    async session({ session, token, user }){
      console.log("session");
      console.log({token, session, user});
      //se agregan las propiedades rol es y id a la sesion para poderla utilizarla en la pagina
      if(session && session.user){
        session.user.roles = token.roles;
        session.user.id = token.id;
      }  
      
      


      return session;
    }
  }

}
const handler = NextAuth(authOptions);

// peticiones get y post serán manejadas con el handler
// esto se configurá así ya que next ahora maneja sus peticiones GET y POST como en el archivo hello/route.ts
export { handler as GET, handler as POST };


