import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

const TherapyServiceStat = () => {
  const router = useRouter();

  const handleServiceClick = () => {
    router.push("/therapy/service/list");
  };
  return (
    <div
      onClick={handleServiceClick}
      className="w-[300px] bg-darkblue rounded-xl px-5 pt-3 font-lights cursor-pointer flex flex-row"
    >
      <div>
        <div className=" font-bold">Current Services</div>
        <div className="text-6xl text-customGreen">04</div>
        <div className="text-sm pb-1">Services</div>
      </div>
      <div className="flex flex-col justify-end h-full pb-2 text-customGreen">
        <ArrowUpRightIcon className="w-8" />
      </div>
    </div>
  );
};

export default TherapyServiceStat;
