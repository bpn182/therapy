import Button from "@/components/form/Button";
import logo from "@public/assets/images/alt-icon.png";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className=" h-screen bg-darkblue">
      <div className="w-30 pt-8 text-center flex justify-center">
        <Image
          width={100}
          height={100}
          className=" text-center"
          src={logo}
          alt="Alt Therapy"
        />
      </div>

      <div className="flex flex-row justify-center mt-32 space-x-4 font-bold">
        <div className="flex flex-col space-y-5">
          <Link href="/user/signin" className="w-48">
            <Button text="Client" />
          </Link>
          <Link href="/therapy/signin" className="w-48 ">
            <Button text="Therapy Provider " />
          </Link>
        </div>
        <div className="flex flex-col space-y-5">
          <Link href="/admin/signin" className="w-48 ">
            <Button text="Admin" />
          </Link>
          {/* <Link href="/insurance/signin" className="w-48 ">
            <Button text="Insurance " />
          </Link> */}
        </div>
      </div>
    </main>
  );
}
