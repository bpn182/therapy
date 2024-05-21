"use client";
import Button from "@/components/form/Button";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useTherapyStore } from "@/store/zustand";
import { useRouter } from "next/navigation";
import { useDoctorListQuery } from "@/Query/doctor.query";
import Api from "@/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function Appointments() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { setDoctor } = useTherapyStore();
  const { data = [], isLoading, error } = useDoctorListQuery();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => Api.deleteDoctorById(id),
    onSuccess: () => {
      toast.success("Deleted Successfully", {
        position: "top-right",
        autoClose: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ["doctorList"] });
    },
    onError: (error) => {
      console.log(error);
      toast.error("Error. Please try again!", {
        position: "top-right",
        autoClose: 3000,
      });
    },
  });

  const handleEdit = (doctor: any) => {
    setDoctor(doctor);
    router.push("/therapy/doctor/update");
  };

  const handleDelete = (doctor: any) => {
    console.log(doctor);
    deleteMutation.mutate(doctor.id);
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
              Service
            </th>
            <th className="border-b-2 border-gray-300 py-2 font-semibold">
              Phone
            </th>
            <th className="border-b-2 border-gray-300 py-2 font-semibold">
              Specialization
            </th>
            <th className="border-b-2 border-gray-300 py-2 font-semibold">
              PersonalBio
            </th>
            <th className="border-b-2 border-gray-300 py-2 font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((doctor: any, index: number) => (
            <tr key={index}>
              <td className="border-b border-gray-200 py-2">{doctor.name}</td>
              <td className="border-b border-gray-200 py-2">
                {doctor?.service?.name}
              </td>
              <td className="border-b border-gray-200 py-2">{doctor.phone}</td>
              <td className="border-b border-gray-200 py-2">
                {doctor.specialization}
              </td>
              <td className="border-b border-gray-200 py-2">
                {doctor.personalBio}
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
