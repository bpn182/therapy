"use client";
import NavBar from "@/components/navs/NavBar";
import LeftMenuItems from "../_components/LeftMenuItems";
import TopImageBanner from "../_components/TopImageBanner";
import { useRouter } from "next/navigation";
import { insurancePathConfig } from "@/constants/insurance.constants";
import { HomeIcon, DocumentIcon } from "@heroicons/react/24/outline";
import TherapyServiceStat from "../_components/TherapyServiceStat";

const menuItems = [
  {
    text: "My Dashboard",
    icon: <HomeIcon />,
    href: ["/insurance"],
  },
  {
    text: "Claims",
    icon: <DocumentIcon />,
    href: [
      "/insurance/claim/list",
      "/insurance/claim/update",
    ],
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
              <TopImageBanner pathConfig={insurancePathConfig} />
              <TherapyServiceStat
                url="/insurance/claim/list"
                mainText="Claims"
                subText="View Claims"
                count={4}
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
