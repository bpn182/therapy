"use client";
import Button from "@/components/form/Button";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useTherapyStore } from "@/store/zustand";
import { useRouter } from "next/navigation";
import { IDoctor } from "@/app/interfaces/doctor.interace";

const doctors = [
  {
    _id: "1",
    name: "Dr. Smith",
    phone: "1234567890",
    email: "doc1@gmail.com",
    service: "Therapy",
  },
  {
    _id: "2",
    name: "Dr. Johnson",
    phone: "1234567890",
    email: "doc2@gmail.com",
    service: "Accupuncture",
  },
  {
    _id: "3",
    name: "Dr. Williams",
    phone: "1234567890",
    email: "doc3@gmail.com",
    service: "Therapy",
  },
  {
    _id: "4",
    name: "Dr. Davis",
    phone: "1234567890",
    email: "doc4@gmail.com",
    service: "Accupuncture",
  },
];

export default function Appointments() {
  const router = useRouter();

  const { setDoctor } = useTherapyStore();

  const handleEdit = (doctor: IDoctor) => {
    setDoctor(doctor);
    router.push("/therapy/doctor/update");
  };

  const handleDelete = (doctor: IDoctor) => {
    console.log(doctor);
  };

  const handleNewDoctorAdd = () => {
    setDoctor(null);
    router.push("/therapy/doctor/add");
  };

  return (
    <>
      <div className="flex justify-between align-m_iddle">
        <div className="font-bold text-darkblue flex items-center">Doctors</div>
        <div className="w-48 text-sm text-white">
          <Button text="Add Doctor" onClick={handleNewDoctorAdd} />
        </div>
      </div>
      <table className="w-full text-left text-sm mt-2">
        <thead>
          <tr>
            <th className="border-b-2 border-gray-300 py-2 font-semibold">
              Name
            </th>
            <th className="border-b-2 border-gray-300 py-2 font-semibold">
              Email
            </th>
            <th className="border-b-2 border-gray-300 py-2 font-semibold">
              Phone
            </th>
            <th className="border-b-2 border-gray-300 py-2 font-semibold">
              Service
            </th>
            <th className="border-b-2 border-gray-300 py-2 font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor, index) => (
            <tr key={index}>
              <td className="border-b border-gray-200 py-2">{doctor.name}</td>
              <td className="border-b border-gray-200 py-2">{doctor.email}</td>
              <td className="border-b border-gray-200 py-2">{doctor.phone}</td>
              <td className="border-b border-gray-200 py-2">
                {doctor.service}
              </td>
              <td className="border-b border-gray-200 py-2 flex h-9 space-x-4">
                <PencilSquareIcon
                  className="cursor-pointer"
                  onClick={() => handleEdit(doctor)}
                />
                <TrashIcon
                  className="text-dangerRed cursor-pointer"
                  onClick={() => handleDelete(doctor)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
