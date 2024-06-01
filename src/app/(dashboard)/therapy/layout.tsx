"use client";
import NavBar from "@/components/navs/NavBar";
import LeftMenuItems from "../_components/LeftMenuItems";
import TopImageBanner from "../_components/TopImageBanner";
import { useRouter } from "next/navigation";
import { therapyPathConfig } from "@/constants/therapy.constants";
import {
  HomeIcon,
  CalendarDaysIcon,
  UserPlusIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";
import TherapyServiceStat from "../_components/TherapyServiceStat";
import { useServicesList } from "@/Query/service.query";
import { useTherapyStore } from "@/store/zustand";
import { useEffect, useState } from "react";
import Loading from "@/components/ui/Loading";

const menuItems = [
  {
    text: "My Dashboard",
    icon: <HomeIcon />,
    href: ["/therapy"],
  },
  {
    text: "Appointments",
    icon: <CalendarDaysIcon />,
    href: ["/therapy/appointment/list", "/therapy/appointment/create"],
  },
  {
    text: "Services",
    icon: <BookOpenIcon />,
    href: [
      "/therapy/service/list",
      "/therapy/service/add",
      "/therapy/service/update",
    ],
  },
  {
    text: "Doctors",
    icon: <UserPlusIcon />,
    href: [
      "/therapy/doctor/list",
      "/therapy/doctor/add",
      "/therapy/doctor/update",
    ],
  },
];

interface IUserLayoutProps {
  children: React.ReactNode;
}
export default function TherapyLayout({
  children,
}: Readonly<IUserLayoutProps>) {
  const router = useRouter();
  const { user = {}, accessToken } = useTherapyStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("accessToken", accessToken, user);
    if (!accessToken || (user && user.role !== "THERAPY_PROVIDER")) {
      router.push("/therapy/signin");
    }
    setIsLoading(false);
  }, [accessToken, router, user, isLoading]);

  const { data = [] } = useServicesList(user?.id);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <NavBar userType={"therapy"} />
      <main className="h-screen bg-gray-100">
        <div className="flex pt-8">
          <LeftMenuItems menuItems={menuItems} />

          <div className="flex-1 flex flex-col  mr-20">
            <div className="flex gap-x-4 h-30  text-white">
              <TopImageBanner pathConfig={therapyPathConfig} />
              <TherapyServiceStat
                url="/therapy/service/list"
                mainText="Services"
                subText="Current Services"
                count={data.length || 0}
              />
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
