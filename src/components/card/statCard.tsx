import {
  HomeIcon,
  DocumentIcon,
  UserIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/24/outline";
import { ReactElement } from "react";

interface IStatCardProps {
  icon: ReactElement;
  text: string;
  count: number;
  className?: string;
  link: string;
}

const StatCard: React.FC<IStatCardProps> = ({
  icon,
  text,
  count,
  className,
}) => {
  return (
    <div
      className={`font-medium bg-darkblue rounded-xl min-w-[200px] p-4 min-h-[120px] ${className}`}
    >
      <div className="flex flex-row">
        <div className="text-white">{icon}</div>
        <div className="text-white ml-4 flex flex-col">
          <div className="text-lg w-full">{text}</div>
          <div className="text-6xl text-customGreen">{count}</div>
          <div className="text-sm text-customGreen flex flex-row items-center">
            <div className="mr-2">View all</div>
            <div>
              <ArrowLongRightIcon className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
