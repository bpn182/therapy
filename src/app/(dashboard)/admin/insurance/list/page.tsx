"use client";
import { useTherapyStore } from "@/store/zustand";
import { usePathname, useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Api from "@/api/api";
import { useInsuranceListQuery } from "@/Query/insurance.query";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

export default function Insurances() {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const { insurance, setInsurance } = useTherapyStore();
  const { data: insurances = [], isLoading, error } = useInsuranceListQuery();

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

  const handleEdit = (insurance: any) => {
    setInsurance(insurance);
    const user_type = pathname.split("/")[2];
    router.push(`/admin/${user_type}/${insurance.id}`);
  };

  const handleDelete = (appointment: any) => {
    console.log(appointment);
    deleteMutation.mutate(appointment.id);
  };

  return (
    <>
      <div className="flex justify-between align-m_iddle">
        <div className="font-bold text-darkblue flex items-center">
          Insurance
        </div>
      </div>
      <table className="w-full text-left text-sm mt-2">
        <thead>
          <tr>
            <th className="border-b-2 border-gray-300 py-2 font-semibold">
              Name
            </th>
            <th className="border-b-2 border-gray-300 py-2 font-semibold">
              Description
            </th>

            <th className="border-b-2 border-gray-300 py-2 font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {insurances.map((insurance: any, index: number) => (
            <tr key={index}>
              <td className="border-b border-gray-200 py-2">
                {insurance.name}
              </td>
              <td className="border-b border-gray-200 py-2">
                {insurance.description}
              </td>

              <td className="border-b border-gray-200 py-2 flex h-9 space-x-4">
                <PencilSquareIcon
                  className="cursor-pointer"
                  onClick={() => handleEdit(insurance)}
                />
                {/* <TrashIcon
                  className="text-dangerRed cursor-pointer"
                  onClick={() => handleDelete(insurance)}
                /> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
