import { WidgetItem } from "@/components/WidgetItem";
import { getServerSession } from "next-auth";
import { authOptions } from '../api/auth/[...nextauth]/route';
// import { redirect } from "next/navigation";

export default async function DashboardPage() {

  // sesion del usuario del lado del servidor
  const session = await getServerSession(authOptions);
  
  // if(!session){
  //   redirect('api/auth/signin');
  // }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <WidgetItem title="Usuario conectado Server-Side">
        {
          JSON.stringify(session?.user)
        }
      </WidgetItem>
    </div>
  );
}
