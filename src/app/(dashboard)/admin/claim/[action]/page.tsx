"use client";
import { useInsuranceListQuery } from "@/Query/insurance.query";
import { useServicesList } from "@/Query/service.query";
import { useUserListQuery } from "@/Query/user.query";
import Api from "@/api/api";
import Button from "@/components/form/Button";
import { TitleWithLine } from "@/components/ui/TitleWithLine";
import { useTherapyStore } from "@/store/zustand";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function AddClaim() {
  const { claim, user } = useTherapyStore();
  const { register, handleSubmit, setValue } = useForm<any>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    data: insurances = [],
    isLoading: isInsuranceLoading,
    error: insuranceErr,
  } = useInsuranceListQuery();

  const {
    data: providers = [],
    isLoading: isProviderLoading,
    error: isProviderErr,
  } = useUserListQuery("THERAPY_PROVIDER");

  const {
    data: services = [],
    isLoading: isServiceLoading,
    error: serviceErr,
  } = useServicesList();

  useEffect(() => {
    if (claim) {
      setValue("insuranceId", claim.insuranceId);
      setValue("serviceId", claim.serviceId);
      setValue("therapyProviderId", claim.therapyProviderId);
      setValue("details", claim.details);
      setValue("claimDetails", claim.claimDetails);
    }
  }, [claim, setValue]);

  const mutation = useMutation({
    mutationFn: Api.addClaim,
    onSuccess: () => {
      successToast("Claim added successfully.");
    },
    onError: (error) => {
      console.log(error);
      showErrorToast("Error. Please try again!");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data) => Api.updateClaimById(claim.id, data),
    onSuccess: () => {
      successToast("Claim updated successfully.");
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
    queryClient.invalidateQueries({ queryKey: ["servicesList"] });
    router.push("/admin/claim/list");
  };

  const showErrorToast = (msg: string) => {
    toast.error(msg, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const onSubmit = (data: any) => {
    if (claim && claim.id) {
      updateMutation.mutate(data);
    } else {
      data.userId = user.id;
      mutation.mutate(data);
    }
  };

  return (
    <>
      <TitleWithLine title="Add Claim" />
      <form className="mt-4 pb-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row mb-3">
          <div className="flex-1 space-y-2 md:mr-4">
            {isInsuranceLoading ? (
              <p>Loading...</p>
            ) : insuranceErr ? (
              <p>Error loading insurance</p>
            ) : (
              <select {...register("insuranceId")} className="custom-input">
                <option value="">Select a Insurance</option>
                {insurances.map((insurance: any) => (
                  <option key={insurance.id} value={insurance.id}>
                    {insurance.name}
                  </option>
                ))}
              </select>
            )}
            {isProviderLoading ? (
              <p>Loading...</p>
            ) : insuranceErr ? (
              <p>Error loading provider</p>
            ) : (
              <select
                {...register("therapyProviderId")}
                className="custom-input"
              >
                <option value="">Select a Provider</option>
                {providers.map((provider: any) => (
                  <option key={provider.id} value={provider.id}>
                    {provider.firstName} {provider.lastName} -{" "}
                    {provider.address}
                  </option>
                ))}
              </select>
            )}
            {/* <input
              ref={fileInputRef}
              className=""
              type="file"
              accept="image/*"
            /> */}
          </div>
          <div className="flex-1 mt-4 md:mt-0">
            {isServiceLoading ? (
              <p>Loading...</p>
            ) : serviceErr ? (
              <p>Error loading service</p>
            ) : (
              <select {...register("serviceId")} className="custom-input">
                <option value="">Select a service</option>
                {services.map((service: any) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
            )}
            <textarea
              {...register("details")}
              placeholder="Details"
              className="mt-2 custom-input"
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
