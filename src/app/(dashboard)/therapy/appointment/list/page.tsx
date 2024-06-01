"use client";
import { IAppointment } from "@/app/interfaces/appointment.interface";
import Button from "@/components/form/Button";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useTherapyStore } from "@/store/zustand";
import { usePathname, useRouter } from "next/navigation";
import { useAppoinmentListQuery } from "@/Query/appointment.query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Api from "@/api/api";

export default function Appointments() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const pathname = usePathname();
  let userRole = pathname.split("/")[1];

  const { user, setAppointment } = useTherapyStore();
  const {
    data: appointments = [],
    isLoading,
    error,
  } = useAppoinmentListQuery({ providerId: user?.id });

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
    router.push(`/${userRole}/appointment/update`);
  };

  const handleDelete = (appointment: any) => {
    deleteMutation.mutate(appointment.id);
  };

  const handleNewAppointment = () => {
    setAppointment(null);
    router.push(`/${userRole}/appointment/add`);
  };

  return (
    <>
      <div className="flex justify-between align-m_iddle">
        <div className="font-bold text-darkblue flex items-center">
          Appointments
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
              Status
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
              <td className="border-b border-gray-200 py-2">
                {appointment.status}
              </td>
              <td className="border-b border-gray-200 py-2 flex h-9 space-x-4">
                <PencilSquareIcon
                  className="cursor-pointer"
                  onClick={() => handleEdit(appointment)}
                />
                {/* {userRole === "user" ? null : (
                  <TrashIcon
                    className="text-dangerRed cursor-pointer"
                    onClick={() => handleDelete(appointment)}
                  />
                )} */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
