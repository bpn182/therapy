import { FC } from "react";

interface TitleWithLineProps {
  title: string;
}

const TitleWithLine: FC<TitleWithLineProps> = ({ title }) => {
  return (
    <div className="flex items-center text-darkblue">
      <div className="font-bold mr-2">{title}</div>
      <div className="flex-1 border-b-2 border-customGreen"></div>
    </div>
  );
};

export { TitleWithLine };
