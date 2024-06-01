"use client";
import React, { useEffect } from "react";
import Button from "@/components/form/Button";
import { TitleWithLine } from "@/components/ui/TitleWithLine";
import { useTherapyStore } from "@/store/zustand";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Api from "@/api/api";
import { toast } from "react-toastify";
import { User } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";

const Page = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm<User>();
  const { tempUser: user } = useTherapyStore();
  const user_type = pathname.split("/")[2];

  console.log("tempUser", user);
  useEffect(() => {
    if (user) {
      setValue("firstName", user.firstName);
      setValue("lastName", user.lastName);
      setValue("contactNumber", user.contactNumber);
      setValue("address", user.address);
    }
  }, [user, setValue]);

  const updateMutation = useMutation({
    mutationFn: (data: User) => Api.updateUserById(user.id, data),
    onSuccess: (data) => {
      successToast("User updated successfully.");
      console.log("after update", data);
      router.push(`/admin/${user_type}/list`);
    },
    onError: (error) => {
      console.log(error);
      showErrorToast("Error. Please try again!");
    },
  });

  const successToast = (msg: string) => {
    toast.success(msg, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const showErrorToast = (msg: string) => {
    toast.error(msg, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const onSubmit = (data: User) => {
    console.log(data);
    updateMutation.mutate(data);
  };
  return (
    <>
      <TitleWithLine
        title={
          user_type === "user" ? "Update User" : "Update Therapy Provider "
        }
      />
      <form className="mt-4 pb-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row mb-3">
          <div className="flex-1 space-y-2 md:mr-4">
            <input
              {...register("firstName")}
              type="text"
              placeholder="Enter first name"
              className="h-10 bg-gray-200 w-full rounded-md px-2"
              defaultValue={user?.firstName}
            />
            <input
              {...register("contactNumber")}
              type="text"
              placeholder="Enter phone number"
              className="h-10 bg-gray-200 w-full rounded-md px-2"
              defaultValue={user?.contactNumber}
            />
          </div>
          <div className="flex-1 mt-4 md:mt-0 space-y-2">
            <input
              {...register("lastName")}
              type="text"
              placeholder="Enter last name"
              className="h-10 bg-gray-200 w-full rounded-md px-2"
              defaultValue={user?.lastName}
            />
            <input
              {...register("address")}
              type="text"
              placeholder="Enter address"
              className="h-10 bg-gray-200 w-full rounded-md px-2"
              defaultValue={user?.address}
            />
          </div>
        </div>
        <Button
          type="submit"
          className="flex flex-row justify-end "
          text={"Update"}
        />
      </form>
    </>
  );
};

export default Page;
