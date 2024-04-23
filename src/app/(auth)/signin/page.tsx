import { Input } from "@/components/form/Input";
import Image from "next/image";
import logo from "@public/assets/images/alt-icon.png";

export default function SignIn() {
  return (
    <main className="flex h-screen">
      <div className="basis-1/3 bg-darkblue text-center text-white min-w-[400px]">
        <div className="mt-16 flex justify-center">
          <Image
            width={100}
            height={100}
            className=" text-center"
            src={logo}
            alt="Alt Therapy"
          />
        </div>

        <div className="mt-16">
          <div className="mb-6">
            Please <span className="font-bold">Sign in</span>
          </div>
          <div className="space-y-3 px-8">
            <Input type="text" placeholder="Email Address" />
            <Input type="password" placeholder="Password" />

            <button className="flex justify-between bg-customGreen w-full rounded-[6px] hover:bg-darkbluehover  text-black hover:text-white transform hover:-translate-y-[3px]">
              <span className="pl-5 py-3 ">Login</span>
              <span className="px-3 py-3 bg-customDarkGreen w-[40px] rounded-r-[6px]">
                {">"}
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="basis-2/3    bg-custom-right-image bg-no-repeat bg-cover"></div>
    </main>
  );
}
