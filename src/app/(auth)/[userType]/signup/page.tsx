"use client";
import Button from "@/components/form/Button";
import { Input } from "@/components/form/Input";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function SignUp({ params }: { params: { userType: string } }) {
  const { userType } = params;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div>
      <div className="text-center w-96 mx-auto bg-white px-8 py-8 rounded-2xl shadow-lg">
        <div>
          To get started{" "}
          <span className="font-bold ">{"Let's Create an Account"}</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3  pt-2">
          <Input type="text" placeholder="First Name" />
          <Input type="text" placeholder="Last Name" />
          <Input type="text" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Button text="Register" />
        </form>
        <div className="text-left font-medium mt-4">
          {"Already have an account?"}
          <Link
            href={`/${userType}/signin`}
            className="text-customGreen font-normal ml-1"
          >
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
}
