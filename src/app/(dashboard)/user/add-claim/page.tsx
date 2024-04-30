import Button from "@/components/form/Button";
import { Input } from "@/components/form/Input";
import { TitleWithLine } from "@/components/ui/TitleWithLine";

export default function AddClaim() {
  return (
    <>
      <TitleWithLine title="Add Claim" />
      <form className="mt-4 pb-8">
        <div className="flex flex-col md:flex-row mb-3">
          <div className="flex-1 space-y-2 md:mr-4">
            <Input type="text" placeholder="Insurance Provider" />
            <Input type="text" placeholder="Claim Type" />
          </div>
          <div className="flex-1 mt-4 md:mt-0">
            <Input type="textarea" placeholder="Details" className="h-full" />
          </div>
        </div>
        <div className="flex justify-end">
          <Button text="Submit" className="w-36" />
        </div>
      </form>
    </>
  );
}
