import { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  placeholder: string;
}

const Input: FC<InputProps> = ({ placeholder, type }) => {
  return (
    <input
      className="w-full px-3 py-3 border border-transparent bg-darkblueshade rounded-[6px] focus:outline-none hover:border-customGreen"
      type={type}
      placeholder={placeholder}
    />
  );
};

export { Input };
