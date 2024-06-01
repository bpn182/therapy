import { ArrowPathIcon } from "@heroicons/react/24/solid";
import React from "react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <ArrowPathIcon className="w-8 text-customGreen animate-spin" />
    </div>
  );
}
