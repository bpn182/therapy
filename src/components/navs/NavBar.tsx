"use client";
import Image from "next/image";
import logo from "@public/assets/images/alt-icon.png";
import Dropdown from "../ui/Dropdown";
import {
  HomeIcon,
  ArrowLeftEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useTherapyStore } from "@/store/zustand";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface INavBarProps {
  userType?: string;
}

const IconCss = "h-5 w-5 mr-4 text-customGreen font-bold";

const NavBar: React.FC<INavBarProps> = ({ userType }) => {
  const router = useRouter();
  const pathname = usePathname();
  const {
    user = {},
    setUser,
    setAccessToken,
    loggedInsurance = {},
    setLoggedInsurance,
  } = useTherapyStore();
  const [isLoading, setIsLoading] = useState(true);

  const isAdmin = pathname.split("/")[1] === "admin";
  const isInsurance = pathname.split("/")[1] === "insurance";

  useEffect(() => {
    // When the user object is available, set isLoading to false
    if (user || (isInsurance && loggedInsurance)) {
      setIsLoading(false);
    }
  }, [user, loggedInsurance, isInsurance]);

  const logoutUser = () => {
    setAccessToken(null);
    if (userType === "insurance") {
      setLoggedInsurance(null);
    }
    setUser(null);
    router.push(`/${userType}/signin`);
  };

  const onClickAccountSettings = () => {
    router.push(`/${userType}/account-settings`);
  };

  const menuItems: any = [
    !isAdmin &&
      !isInsurance && {
        name: "Account settings",
        href: `/${userType}/account-settings`,
        onClick: onClickAccountSettings,
        icon: (
          <HomeIcon className={"h-5 w-5 mr-4 text-customGreen font-bold"} />
        ),
        disabled: true,
      },
    {
      name: "Sign out",
      href: `/${userType}/signin`,
      onClick: logoutUser,
      icon: <ArrowLeftEndOnRectangleIcon className={IconCss} />,
      disabled: false,
    },
  ].filter(Boolean);

  return (
    <nav className="bg-darkblue text-white flex items-center justify-between flex-wrap py-2 pl-20 pr-16">
      <div className="cursor-pointer">
        <Link href={`/`}>
          <Image
            className=" border-customGreen object-cover w-16 h-10 mr-4"
            src={logo}
            alt="Avatar"
            layout="cover"
          />
        </Link>
      </div>
      <div className="flex flex-row items-center">
        <Image
          className="rounded-full border-customGreen border-2 object-cover w-12 h-12 mr-4"
          src={logo}
          alt="Avatar"
          layout="cover"
        />
        <div className="flex flex-col">
          <div className="font-semibold text-sm">
            {isLoading
              ? "Loading..."
              : isInsurance
              ? (loggedInsurance as { name?: string })?.name
              : user?.firstName + " " + user?.lastName}
          </div>
          <div className="text-xs itallic">Account Settings</div>
        </div>
        <Dropdown menuItems={menuItems} />
      </div>
    </nav>
  );
};

export default NavBar;
