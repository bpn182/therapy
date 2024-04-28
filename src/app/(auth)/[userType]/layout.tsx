import type { Metadata } from "next";
import Image from "next/image";
import logo from "@public/assets/images/alt-icon.png";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Therapy Login",
  description: "An alternative to traditional therapy.",
};

interface IAuthLayoutProps {
  children: React.ReactNode;
  params: {
    userType: string;
  };
}
export default function AuthLayout({
  children,
  params,
}: Readonly<IAuthLayoutProps>) {
  // Only allow therapy and user as user types
  if (!["therapy", "user"].includes(params.userType)) {
    redirect("/404");
  }

  return (
    <div className="text-center h-screen bg-gray-100">
      <div className="pt-8 pb-8 flex justify-center">
        <Image
          width={100}
          height={100}
          className=" text-center"
          src={logo}
          alt="Alt Therapy"
        />
      </div>
      <div className="mb-4 text-gray-900">
        Welcome to <span className="font-bold "> Alt Therapy</span>
      </div>

      {children}
    </div>
  );
}
