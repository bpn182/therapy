"use client";
import { useAppoinmentListQuery } from "@/Query/appointment.query";
import { useServicesList } from "@/Query/service.query";
import { useUserListQuery } from "@/Query/user.query";
import Api from "@/api/api";
import Button from "@/components/form/Button";
import { TitleWithLine } from "@/components/ui/TitleWithLine";
import { useTherapyStore } from "@/store/zustand";
import { Claim, User } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function AddClaim() {
  const [selectedService, setSelectedService] = useState<any>({});
  const { claim, user } = useTherapyStore();
  const { register, handleSubmit, setValue } = useForm<any>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    data: providers = [],
    isLoading: isProviderLoading,
    error: isProviderErr,
  } = useUserListQuery("THERAPY_PROVIDER");

  const {
    data: services = [],
    isLoading: isServiceLoading,
    error: serviceErr,
  } = useServicesList(undefined, user?.id);

  useEffect(() => {
    if (claim) {
      setValue("insuranceId", claim?.insurance?.name);
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
    mutationFn: (data: Claim) => Api.updateClaimById(claim.id, data),
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
    router.push("/user/claim/list");
  };

  const showErrorToast = (msg: string) => {
    toast.error(msg, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const onSubmit = (data: Claim) => {
    if (claim && claim.id) {
      data.insuranceId = claim.insuranceId;

      updateMutation.mutate(data);
    } else {
      if (!selectedService || !selectedService.providerId) {
        return showErrorToast("Please select a service");
      }
      data.userId = user.id;
      data.insuranceId = user.insuranceId;
      data.therapyProviderId = selectedService.providerId;

      mutation.mutate(data);
    }
  };

  const onChangeService = (serviceId: string) => {
    const selectedService = services.find(
      (service: any) => service.id === serviceId
    );

    setSelectedService(selectedService);
    const provider = providers.find(
      (p: any) => p.id === selectedService?.providerId
    );
    setValue("therapyProviderId", provider.id);
  };

  return (
    <>
      <TitleWithLine title="Add Claim" />
      <form className="mt-4 pb-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row mb-3">
          <div className="flex-1 space-y-2 md:mr-4">
            <input
              readOnly
              {...register("insuranceId")}
              type="text"
              placeholder="Insurance"
              className="h-10 bg-gray-200 w-full rounded-md px-2"
              defaultValue={user?.insurance?.name}
            />
            {!user?.insurance?.name && (
              <div className="text-red-500 mt-2">
                Please select insurance from account settings.
              </div>
            )}
            {isProviderLoading ? (
              <p>Loading...</p>
            ) : isProviderErr ? (
              <p>Error loading provider</p>
            ) : (
              <select
                disabled
                {...register("therapyProviderId")}
                className="custom-input"
              >
                <option value="">Select a Provider</option>
                {providers.map((provider: User) => (
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
              <select
                {...register("serviceId")}
                className="custom-input"
                onChange={(e) => onChangeService(e.target.value)}
              >
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
            disabled={!user?.insurance?.name}
          />
        </div>
      </form>
    </>
  );
}
