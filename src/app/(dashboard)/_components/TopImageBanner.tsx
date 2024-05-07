"use client";

import { IPathConfig } from "@/app/interfaces/index.interface";
import { usePathname } from "next/navigation";

interface ITopImageBannerProps {
  pathConfig: IPathConfig;
}

const TopImageBanner: React.FC<ITopImageBannerProps> = ({ pathConfig }) => {
  const pathname = usePathname();

  const { mainText, highlightText, subText } = pathConfig[pathname] || {};

  return (
    <div className="rounded-xl overflow-hidden bg-dashboard-top-image bg-cover bg-center w-4/5 flex flex-col justify-center pl-8 ">
      <div className="font-bold text-2xl">
        {mainText && (
          <>
            {mainText}
            <span className="text-customGreen">{highlightText}</span>
          </>
        )}
      </div>
      {subText && <div>{subText}</div>}
    </div>
  );
};

export default TopImageBanner;
