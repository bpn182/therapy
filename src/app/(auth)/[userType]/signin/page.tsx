"use client";
import Api from "@/api/api";
import Button from "@/components/form/Button";
import { useTherapyStore } from "@/store/zustand";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

export default function SignIn({ params }: { params: { userType: string } }) {
  const router = useRouter();
  const { setAccessToken, setUser } = useTherapyStore();
  const pathname = usePathname();
  let userRole = pathname.split("/")[1].toUpperCase();

  console.log("pathname", pathname);
  console.log("userRole", userRole);
  const { userType } = params;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: Api.login,
    onSuccess: (response: any) => {
      const { data, accessToken } = response;
      if (data && accessToken) {
        setAccessToken(accessToken);
        setUser(data);
        toast.success("Sucessfully logged in.", {
          position: "top-right",
          autoClose: 3000,
        });
        navigateToDashboard(data);
      } else {
        showErrorToast("Error. Please try again!");
      }
    },
    onError: (error: any) => {
      const msg = error?.response?.data?.message || "Error. Please try again!";
      showErrorToast(msg);
    },
  });

  const showErrorToast = (msg: string) => {
    toast.error(msg, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const onSubmit = (data: any) => {
    console.log(data);
    mutation.mutate(data);
  };

  const navigateToDashboard = (data: any) => {
    if (data.role === "ADMIN") {
      router.push(`/admin`);
    } else if (data.role === "THERAPY_PROVIDER") {
      router.push(`/therapy`);
    } else if (data.role === "USER") {
      router.push(`/user`);
    } else {
      toast.error("Invalid user role", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="text-center w-96 mx-auto bg-white px-8 py-8 rounded-2xl shadow-lg">
        <div>
          Please <span className="font-bold ">Sign in</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3  pt-2">
          <input
            {...register("email")}
            className="custom-input"
            type="text"
            placeholder="Email"
          />{" "}
          <input
            {...register("password")}
            className="custom-input"
            type="password"
            placeholder="Password"
          />
          <Button text="Login" type="submit" />
        </form>
        {userRole === "ADMINs" ? null : (
          <div className="text-left font-medium mt-4">
            {"Don't have an account?"}
            <Link
              href={`/${userType}/signup`}
              className="text-customGreen font-normal ml-1"
            >
              Sign up here
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
function setAccessToken(accessToken: any) {
  throw new Error("Function not implemented.");
}
