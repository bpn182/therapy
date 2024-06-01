"use client";
import { useClaimListQuery } from "@/Query/claim.query";
import { useUserListQuery } from "@/Query/user.query";
import Api from "@/api/api";
import { TitleWithLine } from "@/components/ui/TitleWithLine";
import { useTherapyStore } from "@/store/zustand";
import { TrashIcon } from "@heroicons/react/24/solid";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Claims() {
  const router = useRouter();
  const { tempUser, setTempUser } = useTherapyStore();
  const queryClient = useQueryClient();
  const pathname = usePathname();

  let userRole = pathname.split("/")[2].toUpperCase();
  if (userRole === "THERAPY") {
    userRole = "THERAPY_PROVIDER";
  }
  const { data: users = [], isLoading, error } = useUserListQuery(userRole);

  const deleteMutation = useMutation({
    mutationFn: (id: string) => Api.deleteClaimById(id),
    onSuccess: () => {
      toast.success("Deleted Successfully", {
        position: "top-right",
        autoClose: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ["claimList"] });
    },
    onError: (error) => {
      console.log(error);
      toast.error("Error. Please try again!", {
        position: "top-right",
        autoClose: 3000,
      });
    },
  });

  const handleEdit = (user: any) => {
    setTempUser(user);
    const user_type = pathname.split("/")[2];
    router.push(`/admin/${user_type}/${user.id}`);
  };

  const handleDelete = (claim: any) => {
    deleteMutation.mutate(claim.id);

  };
  return (
    <>
      <TitleWithLine title="Claims" />
      <table className="w-full text-left text-sm mt-2">
        <thead>
          <tr>
            <th className="border-b-2 border-gray-300 py-2 font-semibold">
              Name
            </th>
            <th className="border-b-2 border-gray-300 py-2 font-semibold">
              phone
            </th>
            <th className="border-b-2 border-gray-300 py-2 font-semibold">
              Email
            </th>

            <th className="border-b-2 border-gray-300 py-2 font-semibold">
              Address
            </th>

            {/* <th className="border-b-2 border-gray-300 py-2 font-semibold">
              Actions
            </th> */}
          </tr>
        </thead>
        <tbody>
          {users.map((user: any, index: number) => (
            <tr key={index}>
              <td className="border-b border-gray-200 py-2">
                {user.firstName} {user.lastName}
              </td>
              <td className="border-b border-gray-200 py-2">
                {user.contactNumber}
              </td>
              <td className="border-b border-gray-200 py-2">{user.email}</td>

              <td className="border-b border-gray-200 py-2">{user.address}</td>
              <td className="border-b border-gray-200 py-2 flex h-9 space-x-4">
                <PencilSquareIcon
                  className="cursor-pointer"
                  onClick={() => handleEdit(user)}
                />
                {/* <TrashIcon
                  className="text-dangerRed cursor-pointer"
                  onClick={() => handleDelete(user)}
                /> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
