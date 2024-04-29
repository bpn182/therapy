import { PlusIcon } from "@heroicons/react/24/outline";

export default function AddClaimButton() {
  return (
    <div className="bg-darkblue rounded-xl px-8 pt-2 font-lights cursor-pointer">
      <div>
        <PlusIcon className="text-customGreen" />
      </div>
      <div className="text-sm">Add Claim</div>
    </div>
  );
}
