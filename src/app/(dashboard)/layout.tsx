"use client";
import NavBar from "@/components/navs/NavBar";
import LeftMenuItems from "./user/_components/LeftMenuItems";
import TopImageBanner from "./user/_components/TopImageBanner";
import AddClaimButton from "./user/_components/AddClaimButton";


interface IUserLayoutProps {
  children: React.ReactNode;
}
export default function UserLayout({ children }: Readonly<IUserLayoutProps>) {

  return (
    <>
      <NavBar />
      <main className="h-screen bg-gray-100">
        <div className="flex justify-center pt-8">
          <LeftMenuItems />
          {/* TODO keep it in a layout */}
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
