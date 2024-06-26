"use client";
import NavBar from "@/components/navs/NavBar";
import LeftMenuItems from "../_components/LeftMenuItems";
import {
  HomeIcon,
  UserIcon,
  BuildingOffice2Icon,
  DocumentIcon,
} from "@heroicons/react/24/outline";
import StatCard from "@/components/card/statCard";
import { useUserListQuery } from "@/Query/user.query";
import { useInsuranceListQuery } from "@/Query/insurance.query";
import { useClaimListQuery } from "@/Query/claim.query";
import { useEffect, useState } from "react";
import { useTherapyStore } from "@/store/zustand";
import { useRouter } from "next/navigation";
import Loading from "@/components/ui/Loading";

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
  {
    text: "Claims",
    icon: <DocumentIcon />,
    href: ["/admin/claim/list", "/admin/claim/update"],
  },
];

interface IUserLayoutProps {
  children: React.ReactNode;
}
export default function UserLayout({ children }: Readonly<IUserLayoutProps>) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const { user = {}, accessToken } = useTherapyStore();

  const { data: users = [] } = useUserListQuery("USER");
  const { data: providers = [] } = useUserListQuery("THERAPY_PROVIDER");
  const { data: insuraces = [] } = useInsuranceListQuery();
  const { data: claims = [] } = useClaimListQuery({});

  useEffect(() => {
    setIsLoading(false);

    if (!accessToken || (user && user.role !== "ADMIN")) {
      router.push("/admin/signin");
    }
  }, [accessToken, router, user, isLoading]);

  if (isLoading) {
    return <Loading />;
  }

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
                count={users.length || 0}
                link="/admin/user/list"
                icon={<UserIcon className="w-6 h-6" />}
              />

              <StatCard
                className=" bg-darkblueshade"
                text="Therapies"
                count={providers.length || 0}
                link="/admin/therapy/list"
                icon={<HomeIcon className="w-6 h-6" />}
              />

              <StatCard
                text="Insurances"
                count={insuraces.length || 0}
                link="/admin/insurance/list"
                icon={<BuildingOffice2Icon className="w-6 h-6" />}
              />

              <StatCard
                className=" bg-darkblueshade"
                text="Claims"
                count={claims.length || 0}
                link="/admin/claim/list"
                icon={<DocumentIcon className="w-6 h-6" />}
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
