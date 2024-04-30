"use client";

import { usePathname } from "next/navigation";

export default function TopImageBanner() {
  const pathname = usePathname();

  const pathConfig: any = {
    "/user": {
      mainText: "Hello, ",
      highlightText: "Bipin",
      subText: "Welcome to Alt Therapy",
    },
    "/user/appointments": {
      mainText: "Your ",
      highlightText: "Appointments",
    },
    "/user/claims": {
      mainText: "Your ",
      highlightText: "Claims",
    },
    "/user/add-claim": {
      mainText: "Claim ",
      highlightText: "Insurance",
    },
    "/user/create-appointment": {
      mainText: "Create an ",
      highlightText: "Appointment",
    },
  };

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
}
