"use client";
import Button from "@/components/form/Button";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useTherapyStore } from "@/store/zustand";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Api from "@/api/api";
import { toast, ToastContainer } from "react-toastify";
import { useServicesList } from "@/Query/service.query";

export default function Services() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setService } = useTherapyStore();

  const { data = [], isLoading, error } = useServicesList();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => Api.deleteServiceById(id),
    onSuccess: () => {
      toast.success("Deleted Successfully", {
        position: "top-right",
        autoClose: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ["servicesList"] });
    },
    onError: (error) => {
      console.log(error);
      toast.error("Error. Please try again!", {
        position: "top-right",
        autoClose: 3000,
      });
    },
  });

  const handleEdit = (service: any) => {
    setService(service);
    router.push("/therapy/service/update");
  };

  const handleDelete = (service: any) => {
    console.log(service);
    deleteMutation.mutate(service.id);
  };

  const handleNewServiceAdd = () => {
    setService(null);
    router.push("/therapy/service/add");
  };

  return (
    <>
      <div className="flex justify-between align-m_iddle">
        <div className="font-bold text-darkblue flex items-center">
          Services
        </div>
        <div className="w-48 text-sm text-white">
          <Button text="Add Service" onClick={handleNewServiceAdd} />
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
              Price
            </th>
            <th className="border-b-2 border-gray-300 py-2 font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((service: any, index: number) => (
            <tr key={index}>
              <td className="border-b border-gray-200 py-2">{service.name}</td>
              <td className="border-b border-gray-200 py-2">
                {service.description}
              </td>
              <td className="border-b border-gray-200 py-2">{service.price}</td>
              <td className="border-b border-gray-200 py-2 flex h-9 space-x-4">
                <PencilSquareIcon
                  className="cursor-pointer"
                  onClick={() => handleEdit(service)}
                />
                <TrashIcon
                  className="text-dangerRed cursor-pointer"
                  onClick={() => handleDelete(service)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
