"use client";
import Api from "@/api/api";
import { IService } from "@/app/interfaces/services.interface";
import Button from "@/components/form/Button";
import { TitleWithLine } from "@/components/ui/TitleWithLine";
import { useTherapyStore } from "@/store/zustand";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

export default function AddService() {
  const { service, user = {} } = useTherapyStore();
  const { register, handleSubmit, setValue } = useForm<IService>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = new QueryClient();
  const router = useRouter();

  useEffect(() => {
    if (service) {
      setValue("name", service.name);
      setValue("description", service.description);
      setValue("price", service.price);
    }
  }, [service, setValue]);

  const mutation = useMutation({
    mutationFn: Api.addService,
    onSuccess: () => {
      successToast("Service added successfully.");
    },
    onError: (error) => {
      console.log(error);
      showErrorToast("Error. Please try again!");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data) => Api.updateServiceById(service.id, data),
    onSuccess: () => {
      successToast("Service updated successfully.");
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
    router.push("/therapy/service/list");
  };

  const showErrorToast = (msg: string) => {
    toast.error(msg, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const onSubmit = (data: any) => {
    if (service && service.id) {
      updateMutation.mutate(data);
    } else {
      data.providerId = user.id;
      mutation.mutate(data);
    }
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
            {/* <input
              ref={fileInputRef}
              className=""
              type="file"
              accept="image/*"
            /> */}
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
