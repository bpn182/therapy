"use client";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

interface TherapyServiceStatProps {
  url: string;
  mainText: string;
  count: number;
  subText: string;
}

const TherapyServiceStat: React.FC<TherapyServiceStatProps> = ({
  url,
  mainText,
  count,
  subText,
}) => {
  const router = useRouter();

  const handleServiceClick = () => {
    router.push(url);
  };

  return (
    <div
      onClick={handleServiceClick}
      className="w-[300px] bg-darkblue rounded-xl px-5 pt-3 font-lights cursor-pointer flex flex-row"
    >
      <div>
        <div className="font-bold">{mainText}</div>
        <div className="text-6xl text-customGreen">{count}</div>
        <div className="text-sm pb-1">{subText}</div>
      </div>
      <div className="flex flex-col justify-end h-full pb-2 text-customGreen">
        <ArrowUpRightIcon className="w-8" />
      </div>
    </div>
  );
};

export default TherapyServiceStat;
