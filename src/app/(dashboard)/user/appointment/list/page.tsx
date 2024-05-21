"use client";
import { IAppointment } from "@/app/interfaces/appointment.interface";
import Button from "@/components/form/Button";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useTherapyStore } from "@/store/zustand";
import { useRouter } from "next/navigation";
import { useAppoinmentListQuery } from "@/Query/appointment.query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Api from "@/api/api";

export default function Appointments() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { user, setAppointment } = useTherapyStore();
  const {
    data: appointments = [],
    isLoading,
    error,
  } = useAppoinmentListQuery({ userId: user?.id });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => Api.deleteAppointmentById(id),
    onSuccess: () => {
      toast.success("Deleted Successfully", {
        position: "top-right",
        autoClose: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ["appoinmentList"] });
    },
    onError: (error) => {
      console.log(error);
      toast.error("Error. Please try again!", {
        position: "top-right",
        autoClose: 3000,
      });
    },
  });

  const handleEdit = (appointment: any) => {
    setAppointment(appointment);
    console.log(appointment);
    router.push("/user/appointment/update");
  };

  const handleDelete = (appointment: any) => {
    console.log(appointment);
    deleteMutation.mutate(appointment.id);
  };

  const handleNewAppointment = () => {
    setAppointment(null);
    router.push("/user/appointment/add");
  };

  return (
    <>
      <div className="flex justify-between align-m_iddle">
        <div className="font-bold text-darkblue flex items-center">
          Appointments
        </div>
        <div className="w-48 text-sm text-white">
          <Button text="Create Appointment" onClick={handleNewAppointment} />
        </div>
      </div>
      <table className="w-full text-left text-sm mt-2">
        <thead>
          <tr>
            <th className="border-b-2 border-gray-300 py-2 font-semibold">
              User
            </th>
            <th className="border-b-2 border-gray-300 py-2 font-semibold">
              Service
            </th>
            <th className="border-b-2 border-gray-300 py-2 font-semibold">
              Appointment Date
            </th>
            <th className="border-b-2 border-gray-300 py-2 font-semibold">
              Appointment Time
            </th>
            <th className="border-b-2 border-gray-300 py-2 font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment: any, index: number) => (
            <tr key={index}>
              <td className="border-b border-gray-200 py-2">
                {appointment.user.firstName} {appointment.user.lastName}
              </td>
              <td className="border-b border-gray-200 py-2">
                {appointment.service.name}
              </td>
              <td className="border-b border-gray-200 py-2">
                {appointment.date}
              </td>
              <td className="border-b border-gray-200 py-2">
                {appointment.time}
              </td>
              <td className="border-b border-gray-200 py-2 flex h-9 space-x-4">
                <PencilSquareIcon
                  className="cursor-pointer"
                  onClick={() => handleEdit(appointment)}
                />
                <TrashIcon
                  className="text-dangerRed cursor-pointer"
                  onClick={() => handleDelete(appointment)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
