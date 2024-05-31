"use client";
import { useServicesList } from "@/Query/service.query";
import Api from "@/api/api";
import Button from "@/components/form/Button";
import { TitleWithLine } from "@/components/ui/TitleWithLine";
import { useTherapyStore } from "@/store/zustand";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function AddDoctor() {
  const { user, doctor } = useTherapyStore();
  const { register, handleSubmit, setValue } = useForm<any>();
  const queryClient = new QueryClient();
  const router = useRouter();

  const { data = [], isLoading, error } = useServicesList(user?.id);

  useEffect(() => {
    if (doctor) {
      setValue("name", doctor.name);
      setValue("specialization", doctor.specialization);
      setValue("personalBio", doctor.personalBio);
      setValue("phone", doctor.phone);
      setValue("serviceId", doctor.service.id);
    }
  }, [doctor, setValue]);

  const mutation = useMutation({
    mutationFn: Api.addDoctor,
    onSuccess: () => {
      successToast("Doctor added successfully.");
    },
    onError: (error) => {
      console.log(error);
      showErrorToast("Error. Please try again!");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data) => Api.updateDoctorById(doctor.id, data),
    onSuccess: () => {
      successToast("Doctor updated successfully.");
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
    queryClient.invalidateQueries({ queryKey: ["doctorList"] });
    router.push("/therapy/doctor/list");
  };

  const showErrorToast = (msg: string) => {
    toast.error(msg, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const onSubmit = (data: any) => {
    console.log("values", data);
    if (doctor && doctor.id) {
      updateMutation.mutate(data);
    } else {
      data.providerId = user.id;

      mutation.mutate(data);
    }
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
              {...register("specialization")}
              className="custom-input"
              type="text"
              placeholder="Specialization"
            />
            <input
              {...register("phone")}
              placeholder="Phone Number"
              className=" custom-input"
            />
          </div>
          <div className="flex-1 space-y-2 md:mt-0">
            {isLoading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error loading services</p>
            ) : (
              <select {...register("serviceId")} className="custom-input">
                <option value="">Select a service</option>
                {data.map((service: any) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
            )}
            <textarea
              {...register("personalBio")}
              placeholder="Personal Bio"
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
