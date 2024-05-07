"use client";
import { IAppointment } from "@/app/interfaces/appointment.interface";
import Button from "@/components/form/Button";
import { TitleWithLine } from "@/components/ui/TitleWithLine";
import { useTherapyStore } from "@/store/zustand";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const CreateAppointment = () => {
  const { appointment } = useTherapyStore();
  const { register, handleSubmit, setValue } = useForm<IAppointment>();

  useEffect(() => {
    console.log("setting values", appointment);
    if (appointment) {
      setValue("service", appointment.service);
      setValue("date", appointment.date);
      setValue("doctor", appointment.doctor);
    }
  }, [appointment, setValue]);

  const onSubmit = (data: IAppointment) => {
    console.log("values", data);
  };

  return (
    <>
      <TitleWithLine title="Make Appointment" />
      <form className="mt-4 pb-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row mb-3">
          <div className="flex-1 space-y-2 md:mr-4">
            <input
              className="custom-input"
              {...register("service")}
              type="text"
              placeholder="Service"
            />
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
            <input
              className="custom-input"
              {...register("doctor")}
              type="text"
              placeholder="Doctor"
              defaultValue={appointment?.doctor}
            />
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
