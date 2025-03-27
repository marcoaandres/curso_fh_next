import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";


export const signInEmailPassword = async( email: string, password: string ) => {
  if(!email || !password) return null;

  const user = await prisma.user.findUnique({ where: {email} });
    console.log(user);
  if(!user){
      const dbUser = await createUser(email, password);
      console.log({dbUser});
    return dbUser;
  }

  if( !bcrypt.compareSync( password, user.password ?? '' )){
    console.log(null);
    return null;
  }
  console.log(user);
  return user;

}

const createUser = async( email: string, password: string ) => {
    const user = await prisma.user.create({
        data:{
            email: email,
            password: bcrypt.hashSync(password),
            name: email.split('@')[0],
        }
    });

    return user;
}