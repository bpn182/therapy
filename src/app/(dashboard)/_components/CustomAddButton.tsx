import { useTherapyStore } from "@/store/zustand";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

interface IAddClaimButtonProps {
  text: string;
  onClick: () => void;
}

const CustomAddButton: React.FC<IAddClaimButtonProps> = ({ text, onClick }) => {
  const router = useRouter();
  const { setClaim } = useTherapyStore();

  return (
    <>
      <div
        onClick={onClick}
        className="bg-darkblue rounded-xl px-8 pt-2 font-lights cursor-pointer"
      >
        <div>
          <PlusIcon className="text-customGreen" />
        </div>
        <div className="text-sm">{text}</div>
      </div>
    </>
  );
};

export default CustomAddButton;
