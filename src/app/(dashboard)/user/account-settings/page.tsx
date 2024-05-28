"use client";
import React, { useEffect } from "react";
import { useInsuranceListQuery } from "@/Query/insurance.query";
import Button from "@/components/form/Button";
import { TitleWithLine } from "@/components/ui/TitleWithLine";
import { useTherapyStore } from "@/store/zustand";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Api from "@/api/api";
import { toast } from "react-toastify";
import { Insurance, User } from "@prisma/client";

export default function Page() {
  const { user, setUser } = useTherapyStore();
  const { register, handleSubmit, setValue } = useForm<User>();

  const { data: insurances = [], isLoading, error } = useInsuranceListQuery();

  useEffect(() => {
    if (user) {
      setValue("insuranceId", user.insuranceId);
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
      setUser(data);
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
      <TitleWithLine title="Account Settings" />
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
            {isLoading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error loading services</p>
            ) : (
              <select {...register("insuranceId")} className="custom-input">
                <option value="">Select a insurance</option>
                {insurances.map((insurance: Insurance) => (
                  <option key={insurance.id} value={insurance.id}>
                    {insurance.name}
                  </option>
                ))}
              </select>
            )}
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
            <input
              {...register("password")}
              type="text"
              placeholder="Enter password"
              className="h-10 bg-gray-200 w-full rounded-md px-2"
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
}
