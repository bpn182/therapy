"use client";
import { IService } from "@/app/interfaces/services.interface";
import Button from "@/components/form/Button";
import { TitleWithLine } from "@/components/ui/TitleWithLine";
import { useTherapyStore } from "@/store/zustand";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

export default function AddService() {
  const { service } = useTherapyStore();
  const { register, handleSubmit, setValue } = useForm<IService>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (service) {
      setValue("name", service.name);
      setValue("description", service.description);
    }
  }, [service, setValue]);

  const onSubmit = (data: IService) => {
    console.log("values", data);
  };

  return (
    <>
      <TitleWithLine title="Add Service" />
      <form className="mt-4 pb-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row mb-3">
          <div className="flex-1 space-y-2 md:mr-4">
            <input
              {...register("name")}
              className="custom-input"
              type="text"
              placeholder="Service Name"
            />
            <input
              {...register("price")}
              className="custom-input"
              type="text"
              placeholder="Price"
            />
          </div>

          <div className="flex-1 space-y-2 md:mt-0">
            <input
              ref={fileInputRef}
              className=""
              type="file"
              accept="image/*"
            />
            <textarea
              {...register("description")}
              placeholder="Description"
              className=" custom-input"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            text={service ? "Update" : "Submit"}
            className="w-36"
          />
        </div>
      </form>
    </>
  );
}
