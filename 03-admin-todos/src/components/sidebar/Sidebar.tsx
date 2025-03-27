
import Image from "next/image";
import { SidebarItem } from "./SidebarItem";
import { IoBasketOutline, IoCalendarOutline, IoCheckboxOutline, IoCodeWorkingOutline, IoListOutline, IoPerson } from "react-icons/io5";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { LogoutButton } from "./LogoutButton";

const menuItems = [
  {
    path: "/dashboard",
    icon: <IoCalendarOutline/>,
    title: "Dashboard",
  },
  {
    path: "/dashboard/rest-todos",
    icon: <IoCheckboxOutline />,
    title: "Rest TODOS",
  },
  {
    path: "/dashboard/server-todos",
    icon: <IoListOutline />,
    title: "Server Todos",
  },
  {
    path: "/dashboard/cookies",
    icon: <IoCodeWorkingOutline />,
    title: "Cookies",
  },
  {
    path: "/dashboard/products",
    icon: <IoBasketOutline />,
    title: "Products",
  },
  {
    path: "/dashboard/profile",
    icon: <IoPerson />,
    title: "Perfil",
  },
];

export const Sidebar = async() => {
    // sesion del usuario del lado del servidor
      const session = await getServerSession(authOptions);
      
      if(!session){
        redirect('api/auth/signin');
      }
      const userName = session.user?.name || '';
      const userEmail = session.user?.email || '';
      const userImage = session.user?.image || 'https://www.svgrepo.com/show/335455/profile-default.svg';
      const userRoles = session.user?.roles || ['no-roles'];
  
  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4"></div>

        <div className="mt-8 text-center">
          <Image
            src={userImage}
            alt=""
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
            width={100}
              height={100}
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            {userName}
          </h5>
          <span className="hidden text-gray-400 lg:block">{userEmail}</span>
          <span className="hidden text-gray-400 lg:block capitalize">
            {userRoles.join(',')}
          </span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {
            menuItems.map((item)=>(
              <SidebarItem key={item.path} {...item}/>
            ))
          }
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <LogoutButton />
      </div>
    </aside>
  );
};
