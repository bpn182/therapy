"use client";
import { joinClassNames } from "@/utils/utils";
import { ReactNode } from "react";

type ButtonProps = {
  text: string;
  type?: "button" | "submit" | "reset";
  rightIcon?: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

const Button = ({
  text,
  rightIcon,
  onClick,
  className = "",
  disabled = false,
  type = "button",
}: ButtonProps) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={joinClassNames(
      className,
      "group flex justify-center items-center bg-customGreen w-full rounded-[6px] hover:bg-darkbluehover hover:text-white transform hover:-translate-y-[3px]"
    )}
  >
    <span className="py-3 font-medium">{text}</span>
    {rightIcon && rightIcon}
  </button>
);

export default Button;
