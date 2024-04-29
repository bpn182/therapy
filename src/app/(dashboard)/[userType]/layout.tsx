import NavBar from "@/components/navs/NavBar";
import { redirect } from "next/navigation";
import LeftMenuItems from "./_components/LeftMenuItems";
import TopImageBanner from "./_components/TopImageBanner";
import AddClaimButton from "./_components/AddClaimButton";

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
      <main className="h-screen bg-gray-100">
        <div className="flex justify-center pt-8">
          <LeftMenuItems />
          {/* Top image section */}
          <div className="flex-1 flex flex-col  mr-20">
            <div className="flex gap-x-4 h-28  text-white">
              <TopImageBanner />
              <AddClaimButton />
            </div>

            {/* Details */}
            <div className="bg-white flex flex-col rounded-xl py-4 px-8 mr-6 mt-4 ">
              {children}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
