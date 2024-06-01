import { TitleWithLine } from "@/components/ui/TitleWithLine";
import { ArrowLongRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function UserPage() {
  return (
    <main className="font-bold text-darkblue min-h-[300px]">
      <TitleWithLine title="Dashboard" />
      <div className="flex items-center justify-center h-full">
        <Link
          href={"/user/appointment/list"}
          className="flex items-center cursor-pointer"
        >
          View All Appointments
          <ArrowLongRightIcon className="w-8 ml-2" />
        </Link>
      </div>
    </main>
  );
}
