"use client";
import Api from "@/api/api";
import Button from "@/components/form/Button";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function SignUp({ params }: { params: { userType: string } }) {
  const router = useRouter();

  const { userType } = params;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: Api.registerUser,
    onSuccess: () => {
      toast.success("User Registered Successfully.", {
        position: "top-right",
        autoClose: 3000,
      });
      navigateToLogin();
    },
    onError: (error) => {
      console.log(error);
      toast.error("Error. Please try again!", {
        position: "top-right",
        autoClose: 3000,
      });
    },
  });

  const onSubmit = (data: any) => {
    data.role = userType.toUpperCase();
    if (data.role === "THERAPY") {
      data.role = "THERAPY_PROVIDER";
    }
    mutation.mutate(data);
  };

  const navigateToLogin = () => {
    router.push(`/${userType}/signin`);
  };

  return (
    <div>
      <div className="text-center w-96 mx-auto bg-white px-8 py-8 rounded-2xl shadow-lg">
        <div>
          To get started
          <span className="font-bold ">{" Let's Create an Account"}</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3  pt-2">
          <input
            {...register("firstName", { required: true })}
            className="custom-input"
            type="text"
            placeholder="First Name"
          />
          <input
            {...register("lastName", { required: true })}
            className="custom-input"
            type="text"
            placeholder="Last Name"
          />
          <input
            {...register("email", { required: true })}
            className="custom-input"
            type="text"
            placeholder="Email"
          />
          <input
            {...register("contactNumber", { required: true })}
            className="custom-input"
            type="text"
            placeholder="Phone Number"
          />
          <input
            {...register("address", { required: true })}
            className="custom-input"
            type="text"
            placeholder="Address"
          />
          <input
            {...register("password", { required: true })}
            className="custom-input"
            type="password"
            placeholder="Password"
          />
          <Button text="Register" type="submit" />
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
