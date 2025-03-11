import Image from "next/image"
import { IoBrowsersOutline, IoCalculator, IoFootball, IoHeartOutline, IoLogoReact } from 'react-icons/io5'
import { SidebarMenuItem } from ".."
import Link from "next/link"

const menuItems = [
    {
        path: '/dashboard/main',
        icon: <IoBrowsersOutline size={40} />,
        title: 'Dashboard',
        subTitle: 'Visualización'
    },
    {
        path: '/dashboard/counter',
        icon: <IoCalculator size={40} />,
        title: 'Counter',
        subTitle: 'Contador Client Side'
    },
    {
        path: '/dashboard/pokemons',
        icon: <IoFootball size={40} />,
        title: 'Pokemons',
        subTitle: 'Generación Estática'
    },
    {
        path: '/dashboard/favorites',
        icon: <IoHeartOutline size={40} />,
        title: 'Favoritos',
        subTitle: 'Global State'
    },
]

export const Sidebar = () => {
    return (
        <div id="menu"
            style={{ width: '400px' }}
            className="bg-gray-900 min-h-screen z-10 text-slate-300 w-64 left-0 overflow-y-scroll">
            <div id="profile" className="px-6 py-10">
                <Link href="#" className="inline-flex space-x-2 items-center">
                    <span>
                        {/* imagenes en next js */}
                        <Image width={50} height={50} className="rounded-full w-8 h-8" src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80" alt="User avatar" quality={90}/>
                    </span>
                    <span className="text-sm md:text-base font-bold">
                        Marco Andrés
                    </span>
                </Link>
            </div>
            <div id="nav" className="w-full px-6">

                {
                    menuItems.map(item => (
                        <SidebarMenuItem key={item.path} {...item} />
                    ))
                }

            </div>
        </div>
    )
}
