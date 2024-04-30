"use client";
import {
  HomeIcon,
  CalendarDaysIcon,
  DocumentIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { joinClassNames } from "@/utils/utils";

export default function LeftMenuItems() {
  const pathname = usePathname();

  const menuItems = [
    {
      text: "My Dashboard",
      icon: <HomeIcon />,
      href: ["/user"],
    },
    {
      text: "Appointments",
      icon: <CalendarDaysIcon />,
      href: ["/user/appointments", "/user/create-appointment"],
    },
    {
      text: "Claims",
      icon: <DocumentIcon />,
      href: ["/user/claims", "/user/add-claim"],
    },
  ];

  return (
    <div className="px-4 py-4 bg-white rounded-xl mr-4 ml-24 w-72 divide-y divide-gray-200 flex-none h-48">
      {menuItems.map((item, index) => (
        <Link
          key={index}
          href={item.href[0]}
          className={joinClassNames(
            "flex",
            "group",
            "px-4",
            "py-4",
            "rounded-xl",
            item.href.includes(pathname)
              ? "bg-customGreen text-white"
              : "hover:bg-gray-200"
          )}
        >
          <div
            className={joinClassNames(
              "w-6",
              "mr-4",
              item.href.includes(pathname)
                ? "text-white"
                : "text-customGreen group-hover:text-customGreen"
            )}
          >
            {item.icon}
          </div>

          <div
            className={joinClassNames(
              "font-medium",
              item.href.includes(pathname)
                ? "text-white"
                : "group-hover:text-black"
            )}
          >
            {item.text}
          </div>
        </Link>
      ))}
    </div>
  );
}
