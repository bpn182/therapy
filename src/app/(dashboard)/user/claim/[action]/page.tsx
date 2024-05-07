"use client";
import { IClaim } from "@/app/interfaces/claim.interface";
import Button from "@/components/form/Button";
import { TitleWithLine } from "@/components/ui/TitleWithLine";
import { useTherapyStore } from "@/store/zustand";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function AddClaim() {
  const { claim } = useTherapyStore();
  const { register, handleSubmit, setValue } = useForm<IClaim>();

  useEffect(() => {
    if (claim) {
      setValue("insuranceProvider", claim.insuranceProvider);
      setValue("claimType", claim.claimType);
      setValue("claimDetails", claim.claimDetails);
    }
  }, [claim, setValue]);

  const onSubmit = (data: IClaim) => {
    console.log("values", data);
  };

  return (
    <>
      <TitleWithLine title="Add Claim" />
      <form className="mt-4 pb-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row mb-3">
          <div className="flex-1 space-y-2 md:mr-4">
            <input
              {...register("insuranceProvider")}
              className="custom-input"
              type="text"
              placeholder="Insurance Provider"
            />
            <input
              {...register("claimType")}
              className="custom-input"
              type="text"
              placeholder="Claim Type"
            />
          </div>
          <div className="flex-1 mt-4 md:mt-0">
            <textarea
              {...register("claimDetails")}
              placeholder="Details"
              className="h-full custom-input"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            text={claim ? "Update" : "Submit"}
            className="w-36"
          />
        </div>
      </form>
    </>
  );
}
