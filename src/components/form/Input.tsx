import { joinClassNames } from "@/utils/utils";
import { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  placeholder: string;
  className?: string;
}

const Input: FC<InputProps> = ({ placeholder, type, className = "" }) => {
  const inputClasses = joinClassNames(
    "w-full",
    "px-3",
    "py-3",
    "border",
    "border-transparent",
    "bg-gray-200",
    "rounded-[6px]",
    "focus:outline-none",
    "hover:border-customGreen",
    className
  );

  if (type === "textarea") {
    return <textarea className={inputClasses} placeholder={placeholder} />;
  }
  if (type === "select") {
    return (
      <select className={joinClassNames(inputClasses, "pr-8")}>
        {[].map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input className={inputClasses} type={type} placeholder={placeholder} />
  );
};
export { Input };
