"use client";
import React, { useEffect } from "react";
import Button from "@/components/form/Button";
import { TitleWithLine } from "@/components/ui/TitleWithLine";
import { useTherapyStore } from "@/store/zustand";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Api from "@/api/api";
import { toast } from "react-toastify";
import { Insurance, User } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";

const Page = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm<Insurance>();
  const { insurance } = useTherapyStore();
  const user_type = pathname.split("/")[2];

  useEffect(() => {
    if (insurance) {
      setValue("name", insurance.name);
      setValue("description", insurance.description);
      setValue("address", insurance.address);
      setValue("phone", insurance.phone);
    }
  }, [insurance, setValue]);

  const updateMutation = useMutation({
    mutationFn: (data: Insurance) =>
      Api.updateInsuranceById(insurance?.id ?? "", data),
    onSuccess: (data) => {
      successToast("Insurance updated successfully.");
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

  const onSubmit = (data: Insurance) => {
    updateMutation.mutate(data);
  };
  return (
    <>
      <TitleWithLine title={"Update Insurance"} />
      <form className="mt-4 pb-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row mb-3">
          <div className="flex-1 space-y-2 md:mr-4">
            <input
              {...register("email")}
              type="text"
              placeholder="Enter email"
              className="h-10 bg-gray-200 w-full rounded-md px-2"
              defaultValue={insurance?.email ?? ""}
            />
            <input
              {...register("name")}
              type="text"
              placeholder="Enter name"
              className="h-10 bg-gray-200 w-full rounded-md px-2"
              defaultValue={insurance?.name}
            />
            <input
              {...register("phone")}
              type="text"
              placeholder="Enter phone number"
              className="h-10 bg-gray-200 w-full rounded-md px-2"
              defaultValue={insurance?.phone ?? ""}
            />
          </div>
          <div className="flex-1 mt-4 md:mt-0 space-y-2">
            {/* <input
              {...register("password")}
              type="text"
              placeholder="Enter password"
              className="h-10 bg-gray-200 w-full rounded-md px-2"
            /> */}
            <input
              {...register("address")}
              type="text"
              placeholder="Enter address"
              className="h-10 bg-gray-200 w-full rounded-md px-2"
              defaultValue={insurance?.address ?? ""}
            />
            <input
              {...register("description")}
              type="text"
              placeholder="Enter description"
              className="h-10 bg-gray-200 w-full rounded-md px-2"
              defaultValue={insurance?.description ?? ""}
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
