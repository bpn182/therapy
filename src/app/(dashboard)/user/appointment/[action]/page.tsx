"use client";
import { useServicesList } from "@/Query/service.query";
import Api from "@/api/api";
import Button from "@/components/form/Button";
import { TitleWithLine } from "@/components/ui/TitleWithLine";
import { useTherapyStore } from "@/store/zustand";
import { generateTimes } from "@/utils/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

const CreateAppointment = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, appointment } = useTherapyStore();
  const { register, handleSubmit, setValue } = useForm<any>();
  const { data = [], isLoading, error } = useServicesList();

  useEffect(() => {
    console.log("setting values", appointment);
    if (appointment) {
      setValue("serviceId", appointment.serviceId);
      setValue("date", appointment.date);
      setValue("time", appointment.time);
    }
  }, [appointment, setValue]);

  const mutation = useMutation({
    mutationFn: Api.addAppointment,
    onSuccess: () => {
      successToast("Appointment added successfully.");
    },
    onError: (error) => {
      console.log(error);
      showErrorToast("Error. Please try again!");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data) => Api.updateAppointmentById(appointment.id, data),
    onSuccess: () => {
      successToast("Appointment updated successfully.");
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
    router.push("/user/appointment/list");
  };

  const showErrorToast = (msg: string) => {
    toast.error(msg, {
      position: "top-right",
      autoClose: 3000,
    });
  };
  
  const onSubmit = (formData: any) => {
    const [selectedService = {}] = data.filter(
      (service: any) => service.id === formData.serviceId
    );

    formData.therapyProviderId = selectedService.providerId;
    console.log("data", formData);

    if (appointment && appointment.id) {
      updateMutation.mutate(formData);
    } else {
      formData.userId = user.id;
      mutation.mutate(formData);
    }
  };

  return (
    <>
      <TitleWithLine title="Make Appointment" />
      <form className="mt-4 pb-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row mb-3">
          <div className="flex-1 space-y-2 md:mr-4">
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

            <div className="font-medium">Appointment Date:</div>
            <input
              {...register("date")}
              type="date"
              placeholder="Select a date"
              className="h-10 bg-gray-200 w-full rounded-md px-2"
              defaultValue={appointment?.date}
            />
          </div>
          <div className="flex-1 mt-4 md:mt-0">
            <select {...register("time")} className="custom-input">
              <option value="">Select a time</option>
              {generateTimes().map((hour: any) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Button
          type="submit"
          className="flex flex-row justify-end "
          text={appointment ? "Update" : "Submit"}
        />
      </form>
    </>
  );
};

export default CreateAppointment;
