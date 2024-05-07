"use client";
import { IDoctor } from "@/app/interfaces/doctor.interace";
import Button from "@/components/form/Button";
import { TitleWithLine } from "@/components/ui/TitleWithLine";
import { useTherapyStore } from "@/store/zustand";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function AddDoctor() {
  const { doctor } = useTherapyStore();
  const { register, handleSubmit, setValue } = useForm<IDoctor>();

  useEffect(() => {
    if (doctor) {
      setValue("name", doctor.name);
      setValue("email", doctor.email);
      setValue("phone", doctor.phone);
      setValue("service", doctor.service);
    }
  }, [doctor, setValue]);

  const onSubmit = (data: IDoctor) => {
    console.log("values", data);
  };

  return (
    <>
      <TitleWithLine title="Add Doctor" />
      <form className="mt-4 pb-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row mb-3">
          <div className="flex-1 space-y-2 md:mr-4">
            <input
              {...register("name")}
              className="custom-input"
              type="text"
              placeholder="Doctor Name"
            />
            <input
              {...register("email")}
              className="custom-input"
              type="text"
              placeholder="Email"
            />
          </div>
          <div className="flex-1 space-y-2 md:mt-0">
            <input
              {...register("phone")}
              placeholder="Phone Number"
              className=" custom-input"
            />
            <input
              {...register("service")}
              placeholder="Service"
              className=" custom-input"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            text={doctor ? "Update" : "Submit"}
            className="w-36"
          />
        </div>
      </form>
    </>
  );
}
