"use client";
import NavBar from "@/components/navs/NavBar";
import LeftMenuItems from "../_components/LeftMenuItems";
import TopImageBanner from "../_components/TopImageBanner";
import AddClaimButton from "../_components/CustomAddButton";
import { useTherapyStore } from "@/store/zustand";
import { useRouter } from "next/navigation";
import { userPathConfig } from "@/constants/user.constants";
import {
  HomeIcon,
  CalendarDaysIcon,
  DocumentIcon,
} from "@heroicons/react/24/outline";
import { useEffect } from "react";

const menuItems = [
  {
    text: "My Dashboard",
    icon: <HomeIcon />,
    href: ["/user"],
  },
  {
    text: "Appointments",
    icon: <CalendarDaysIcon />,
    href: ["/user/appointment/list", "/user/appointment/add"],
  },
  {
    text: "Claims",
    icon: <DocumentIcon />,
    href: ["/user/claim/list", "/user/claim/add", "/user/claim/add"],
  },
];

interface IUserLayoutProps {
  children: React.ReactNode;
}
export default function UserLayout({ children }: Readonly<IUserLayoutProps>) {
  const { setClaim, accessToken } = useTherapyStore();
  const router = useRouter();

  useEffect(() => {
    if (!accessToken) {
      router.push("/user/signin");
    }
  }, [accessToken, router]);

  const handleAddClaim = () => {
    setClaim(null);
    router.push("/user/claim/add");
  };

  return (
    <>
      <NavBar userType="user" />
      <main className="h-screen bg-gray-100">
        <div className="flex justify-center pt-8">
          <LeftMenuItems menuItems={menuItems} />

          <div className="flex-1 flex flex-col  mr-20">
            <div className="flex gap-x-4 h-28  text-white">
              <TopImageBanner pathConfig={userPathConfig} />
              <AddClaimButton text="Add Claim" onClick={handleAddClaim} />
            </div>

            <div className="bg-white flex flex-col rounded-xl py-4 px-8 mr-6 mt-4 ">
              {children}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
