import Button from "@/components/form/Button";
import { Input } from "@/components/form/Input";
import { TitleWithLine } from "@/components/ui/TitleWithLine";
import Link from "next/link";

export default function CreateAppointment() {
  return (
    <>
      <TitleWithLine title="Make Appointment" />
      <form className="mt-4 pb-8">
        <div className="flex flex-col md:flex-row mb-3">
          <div className="flex-1 space-y-2 md:mr-4">
            <Input type="text" placeholder="Service" />
            <div className="font-medium">Appointment Date:</div>
            <input
              type="date"
              placeholder="Select a date"
              className="h-10 bg-gray-200 w-full rounded-md px-2"
            />
          </div>
          <div className="flex-1 mt-4 md:mt-0">
            <Input type="text" placeholder="Doctor" />
          </div>
        </div>
        <Link href="#" className="flex flex-row justify-end ">
          <Button text="Submit" />
        </Link>
      </form>
    </>
  );
}
