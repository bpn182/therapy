"use client";
import { IAppointment } from "@/app/interfaces/appointment.interface";
import Button from "@/components/form/Button";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useTherapyStore } from "@/store/zustand";
import { useRouter } from "next/navigation";

const appointments = [
  {
    _id: "1",
    customer: "Bipin Bhandari",
    doctor: "Dr. Smith",
    date: "2022-01-01",
    time: "10:00 AM",
    service: "Therapy",
  },
  {
    _id: "2",
    customer: "Kamala Khadka",
    doctor: "Dr. Johnson",
    date: "2022-01-02",
    time: "2:00 PM",
    service: "Therapy",
  },
  {
    _id: "3",
    customer: "Sudeep Sharma",
    doctor: "Dr. Williams",
    date: "2022-01-03",
    time: "1:00 PM",
    service: "Therapy",
  },
  {
    _id: "4",
    customer: "Sangharsha Chaulagain",
    doctor: "Dr. Davis",
    date: "2022-01-04",
    time: "3:00 PM",
    service: "Therapy",
  },
];

export default function Appointments() {
  const router = useRouter();

  const { setAppointment } = useTherapyStore();

  const handleEdit = (appointment: IAppointment) => {
    setAppointment(appointment);
    console.log(appointment);
    router.push("/user/appointment/update");
  };

  const handleDelete = (appointment: IAppointment) => {
    console.log(appointment);
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
              Customer
            </th>
            <th className="border-b-2 border-gray-300 py-2 font-semibold">
              Doctor
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
          {appointments.map((appointment, index) => (
            <tr key={index}>
              <td className="border-b border-gray-200 py-2">
                {appointment.customer}
              </td>
              <td className="border-b border-gray-200 py-2">
                {appointment.doctor}
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
