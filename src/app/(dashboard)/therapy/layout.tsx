"use client";
import NavBar from "@/components/navs/NavBar";
import LeftMenuItems from "../_components/LeftMenuItems";
import TopImageBanner from "../_components/TopImageBanner";
import AddClaimButton from "../_components/CustomAddButton";
import { useTherapyStore } from "@/store/zustand";
import { useRouter } from "next/navigation";
import { therapyPathConfig } from "@/constants/therapy.constants";
import {
  HomeIcon,
  CalendarDaysIcon,
  UserPlusIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";

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
  const { setService } = useTherapyStore();
  const router = useRouter();

  const handleAddService = () => {
    setService(null);
    router.push("/therapy/service/add");
  };

  return (
    <>
      <NavBar />
      <main className="h-screen bg-gray-100">
        <div className="flex justify-center pt-8">
          <LeftMenuItems menuItems={menuItems} />

          <div className="flex-1 flex flex-col  mr-20">
            <div className="flex gap-x-4 h-28  text-white">
              <TopImageBanner pathConfig={therapyPathConfig} />
              <AddClaimButton text="Add Service" onClick={handleAddService} />
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
