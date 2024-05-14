"use client";
import Button from "@/components/form/Button";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useTherapyStore } from "@/store/zustand";
import { useRouter, usePathname } from "next/navigation";
import { mockUsers } from "@/constants/mock";
import { toPascalCase } from "@/utils/utils";

export default function Appointments() {
  const router = useRouter();
  const pathname = usePathname();

  const userRole = pathname.split("/")[2].toUpperCase();
  const filteredUsers = mockUsers.filter((user) => user.role === userRole);

  const { setDoctor } = useTherapyStore();

  const handleEdit = (user: any) => {
    // setDoctor(user);
    router.push("/therapy/user/update");
  };

  const handleDelete = (user: any) => {
    console.log(user);
  };

  const handleNewUserAdd = () => {
    // setDoctor(null);
    router.push("/therapy/user/add");
  };

  return (
    <>
      <div className="flex justify-between align-m_iddle">
        <div className="font-bold text-darkblue flex items-center">{toPascalCase(userRole)}</div>
        <div className="w-48 text-sm text-white">
          <Button text="Add User" onClick={handleNewUserAdd} />
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
              Address
            </th>
            <th className="border-b-2 border-gray-300 py-2 font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index}>
              <td className="border-b border-gray-200 py-2">{user.name}</td>
              <td className="border-b border-gray-200 py-2">{user.email}</td>
              <td className="border-b border-gray-200 py-2">{user.phone}</td>
              <td className="border-b border-gray-200 py-2">{user.address}</td>
              <td className="border-b border-gray-200 py-2 flex h-9 space-x-4">
                <PencilSquareIcon
                  className="cursor-pointer"
                  onClick={() => handleEdit(user)}
                />
                <TrashIcon
                  className="text-dangerRed cursor-pointer"
                  onClick={() => handleDelete(user)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
