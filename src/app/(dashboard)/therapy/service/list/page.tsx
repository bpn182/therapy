"use client";
import Button from "@/components/form/Button";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useTherapyStore } from "@/store/zustand";
import { useRouter } from "next/navigation";
import { IService } from "@/app/interfaces/services.interface";

const services = [
  {
    _id: "1",
    name: "Therapy",
    description:
      "Therapy is  intended to relieve or heal a stress and anxiety.",
    price: "$100",
  },
  {
    _id: "2",
    name: "Accupuncture",
    description: "Accupuncture is a form of alternative medicine.",
    price: "$200",
  },
  {
    _id: "3",
    name: "Chiropractic",
    description: "Chiropractic is a form of alternative medicine.",
    price: "$110",
  },
  {
    _id: "4",
    name: "Physiotherapy",
    description:
      "Physiotherapy is a health care profession that aims to help patients.",
    price: "$90",
  },
];

export default function Services() {
  const router = useRouter();

  const { setService } = useTherapyStore();

  const handleEdit = (service: IService) => {
    setService(service);
    router.push("/therapy/service/update");
  };

  const handleDelete = (service: IService) => {
    console.log(service);
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
          {services.map((service, index) => (
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
