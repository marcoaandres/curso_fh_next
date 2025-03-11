"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { JSX } from "react";

interface Props {
  path: string;
  icon: JSX.Element;
  title: string;
}

export const SidebarItem = ({ path, icon, title }: Props) => {
  const currentPath = usePathname();

  return (
    <li>
      <Link
        href={path}
        className={`px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group hover:bg-gradient-to-r hover:bg-sky-600 hover:text-white  
            ${
              currentPath === path
                ? "text-white bg-gradient-to-r from-sky-600 to-cyan-400"
                : ""
            }`}
      >
        {icon}
        <span className="-mr-1 font-medium">{title}</span>
      </Link>
    </li>
  );
};
