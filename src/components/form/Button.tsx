"use client";
import { ReactNode } from "react";

type ButtonProps = {
  text: string;
  rightIcon?: ReactNode;
  onClick?: () => void;
};

const Button = ({ text, rightIcon, onClick }: ButtonProps) => (
  <button
    onClick={onClick}
    className="group flex justify-center  items-center bg-customGreen w-full rounded-[6px] hover:bg-darkbluehover text-black hover:text-white transform hover:-translate-y-[3px]"
  >
    <span className="pl-5 py-3 font-medium">{text}</span>
    {rightIcon && rightIcon}
  </button>
);

export default Button;
