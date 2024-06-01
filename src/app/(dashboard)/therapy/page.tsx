import { TitleWithLine } from "@/components/ui/TitleWithLine";
import { ArrowLongRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const TherapyHomePage = () => {
  return (
    <main className="font-bold text-darkblue min-h-[300px]">
      <TitleWithLine title="Therapy Dashboard" />
      <div className="flex items-center justify-center h-full">
        <Link
          href={"/therapy/service/list"}
          className="flex items-center cursor-pointer"
        >
          View All Services
          <ArrowLongRightIcon className="w-8 ml-2" />
        </Link>
      </div>
    </main>
  );
};

export default TherapyHomePage;
