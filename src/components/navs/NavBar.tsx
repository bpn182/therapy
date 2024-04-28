"use client";
import Image from "next/image";
import logo from "@public/assets/images/alt-icon.png";
import Dropdown from "../ui/Dropdown";
import {
  HomeIcon,
  ArrowLeftEndOnRectangleIcon,
} from "@heroicons/react/24/outline";

interface INavBarProps {
  userType: string;
}

const IconCss = "h-5 w-5 mr-4 text-customGreen font-bold";

const NavBar: React.FC<INavBarProps> = ({ userType }) => {
  const menuItems = [
    {
      name: "Account settings",
      href: `${userType}/account-settings`,
      icon: <HomeIcon className={"h-5 w-5 mr-4 text-customGreen font-bold"} />,
    },
    {
      name: "Sign out",
      href: `${userType}/signin`,
      icon: <ArrowLeftEndOnRectangleIcon className={IconCss} />,
    },
  ];
  return (
    <nav className="bg-darkblue text-white flex items-center justify-between flex-wrap py-2 pl-20 pr-16">
      <div className="">
        <Image
          className=" border-customGreen object-cover w-16 h-10 mr-4"
          src={logo}
          alt="Avatar"
          layout="cover"
        />
      </div>
      <div className="flex flex-row items-center">
        <Image
          className="rounded-full border-customGreen border-2 object-cover w-12 h-12 mr-4"
          src={logo}
          alt="Avatar"
          layout="cover"
        />
        <div className="flex flex-col">
          <div className="font-semibold text-sm">Bipin Bhandari</div>
          <div className="text-xs itallic">Account Settings</div>
        </div>
        <Dropdown menuItems={menuItems} />
      </div>
    </nav>
  );
};

export default NavBar;
