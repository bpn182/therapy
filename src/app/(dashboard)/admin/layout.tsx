"use client";
import NavBar from "@/components/navs/NavBar";
import LeftMenuItems from "../_components/LeftMenuItems";
import { useRouter } from "next/navigation";
import { insurancePathConfig } from "@/constants/insurance.constants";
import {
  HomeIcon,
  DocumentIcon,
  UserIcon,
  BuildingOffice2Icon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";
import StatCard from "@/components/card/statCard";

const menuItems = [
  {
    text: "My Dashboard",
    icon: <HomeIcon />,
    href: ["/admin"],
  },
  {
    text: "Users",
    icon: <UserIcon />,
    href: ["/admin/user/list", "/admin/user/update"],
  },
  {
    text: "Therapies",
    icon: <HomeIcon />,
    href: ["/admin/therapy/list", "/admin/therapy/update"],
  },
  {
    text: "Insurances",
    icon: <BuildingOffice2Icon />,
    href: ["/admin/insurance/list", "/admin/user/update"],
  },
];

interface IUserLayoutProps {
  children: React.ReactNode;
}
export default function UserLayout({ children }: Readonly<IUserLayoutProps>) {
  const router = useRouter();

  return (
    <>
      <NavBar userType="user" />
      <main className="h-screen bg-gray-100">
        <div className="flex justify-center pt-8">
          <LeftMenuItems menuItems={menuItems} />

          <div className="flex-1 flex flex-col  mr-20">
            <div className="flex gap-x-4 h-30  text-white">
              <StatCard
                text="Users"
                count={4}
                link="/admin/users"
                icon={<UserIcon className="w-6 h-6" />}
              />

              <StatCard
                className=" bg-darkblueshade"
                text="Therapies"
                count={6}
                link="/admin/users"
                icon={<HomeIcon className="w-6 h-6" />}
              />

              <StatCard
                text="Insurances"
                count={5}
                link="/admin/users"
                icon={<BuildingOffice2Icon className="w-6 h-6" />}
              />

              <StatCard
                className=" bg-darkblueshade"
                text="Claims"
                count={4}
                link="/admin/users"
                icon={<BookOpenIcon className="w-6 h-6" />}
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
