"use client";
import Api from "@/api/api";
import Button from "@/components/form/Button";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

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
      // router.push(`/${userType}/signin`);
      toast.success("Success Notification !", {
        position: "top-right",
      });
    },
    onError: (error) => {
      console.log(error);
      toast.error("An error occurred", {
        position: "top-right",
      });
    },
  });

  const onSubmit = (data: any) => {
    // data.role = "ADMIN";
    // data.firstName = "Bipin";
    // data.lastName = "Bhandari";
    console.log("data before", data);
    mutation.mutate(data);
  };

  const navigateToLogin = () => {
    router.push(`/${userType}/signin`);
  };
  return (
    <div>
      <ToastContainer />
      <div className="text-center w-96 mx-auto bg-white px-8 py-8 rounded-2xl shadow-lg">
        <div>
          To get started
          <span className="font-bold ">{"Let's Create an Account"}</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3  pt-2">
          <input
            {...register("name")}
            className="custom-input"
            type="text"
            placeholder="Name"
          />
          <input
            {...register("email")}
            className="custom-input"
            type="text"
            placeholder="Email"
          />
          <input
            {...register("phone")}
            className="custom-input"
            type="text"
            placeholder="Phone"
          />
          <input
            {...register("address")}
            className="custom-input"
            type="text"
            placeholder="Address"
          />
          <input
            {...register("password")}
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
