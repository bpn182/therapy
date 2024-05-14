"use client";
import { IClaim } from "@/app/interfaces/claim.interface";
import Button from "@/components/form/Button";
import Loader from "@/components/ui/Loader";
import { TitleWithLine } from "@/components/ui/TitleWithLine";
import { useTherapyStore } from "@/store/zustand";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

export default function AddClaim() {
  const { claim } = useTherapyStore();
  const { register, handleSubmit, setValue } = useForm<IClaim>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (claim) {
      setValue("feedback", claim.feedback);
      setValue("status", claim.status);
    }
  }, [claim, setValue]);

  const onSubmit = (data: IClaim) => {
    console.log("values", data);
  };

  const renderUserDetails = (title: string, value: string) => (
    <div className="font-medium">
      {title}: <span className="font-normal">{value}</span>
    </div>
  );

  if (!claim) {
    return <Loader />;
  }

  return (
    <>
      <TitleWithLine title="Add Claim" />
      <form className="mt-4 pb-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row mb-3">
          <div className="flex-1 space-y-2 md:mr-4">
            {renderUserDetails("User", claim.user)}
            {renderUserDetails("Therapy", claim.claimType)}
            {renderUserDetails("Date", claim.date)}
            <div className="font-medium flex flex-row items-center">
              File:
              {claim.file ? (
                <PhotoIcon
                  className="ml-2 w-8 h-8 cursor-pointer"
                  onClick={() => window.open(claim.file, "_blank")}
                />
              ) : (
                <span className="ml-2 font-normal">N/A</span>
              )}
            </div>
            <div className="font-medium">Details:</div>
            <div>{claim.claimDetails}</div>
          </div>
          <div className="flex-1 mt-4 md:mt-0">
            <div className="font-medium">Status:</div>
            <select
              className="font-normal custom-input"
              {...register("status")}
            >
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
            <div className="font-medium mt-1">Feedback:</div>
            <textarea
              {...register("feedback")}
              placeholder="Feedback"
              className="custom-input"
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
