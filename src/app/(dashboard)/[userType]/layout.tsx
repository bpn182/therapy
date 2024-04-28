import NavBar from "@/components/navs/NavBar";
import { redirect } from "next/navigation";

interface IUserLayoutProps {
  children: React.ReactNode;
  params: {
    userType: string;
  };
}
export default function UserLayout({
  children,
  params,
}: Readonly<IUserLayoutProps>) {
  if (!["therapy", "user"].includes(params.userType)) {
    redirect("/404");
  }
  return (
    <>
      <NavBar userType={params.userType} />
      {children}
    </>
  );
}
