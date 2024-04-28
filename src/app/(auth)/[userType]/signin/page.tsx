"use client";
import { Input } from "@/components/form/Input";
import Button from "@/components/form/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function SignIn({ params }: { params: { userType: string } }) {
  const router = useRouter();

  const { userType } = params;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const navigateToDashboard = () => {
    router.push(`/${userType}`);
  };

  return (
    <div>
      <div className="text-center w-96 mx-auto bg-white px-8 py-8 rounded-2xl shadow-lg">
        <div>
          Please <span className="font-bold ">Sign in</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3  pt-2">
          <Input type="text" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Button text="Login" onClick={navigateToDashboard} />
        </form>
        <div className="text-left font-medium mt-4">
          {"Don't have an account?"}
          <Link
            href={`/${userType}/signup`}
            className="text-customGreen font-normal ml-1"
          >
            Sign up here
          </Link>
        </div>
      </div>
    </div>
  );
}
