"use client";
import { useClaimListQuery } from "@/Query/claim.query";
import Api from "@/api/api";
import { IClaim } from "@/app/interfaces/claim.interface";
import { TitleWithLine } from "@/components/ui/TitleWithLine";
import { useTherapyStore } from "@/store/zustand";
import { TrashIcon } from "@heroicons/react/24/solid";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Claims() {
  const router = useRouter();
  const { user, setClaim, claim } = useTherapyStore();
  const queryClient = useQueryClient();
  const pathname = usePathname();
  let userRole = pathname.split("/")[1];


  const {
    data: claims = [],
    isLoading,
    error,
  } = useClaimListQuery({ userId: user?.id });

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

  const handleEdit = (claim: any) => {
    setClaim(claim);
    router.push(`/${userRole}/claim/update`);
  };

  const handleDelete = (claim: any) => {
    deleteMutation.mutate(claim.id);

    console.log(claim);
  };
  return (
    <>
      <TitleWithLine title="Claims" />
      <table className="w-full text-left text-sm mt-2">
        <thead>
          <tr>
            <th className="border-b-2 border-gray-300 py-2 font-semibold">
              Insurance Provider
            </th>
            <th className="border-b-2 border-gray-300 py-2 font-semibold">
              Therapy Provider
            </th>
            <th className="border-b-2 border-gray-300 py-2 font-semibold">
              Service
            </th>

            <th className="border-b-2 border-gray-300 py-2 font-semibold">
              Details
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
          {claims.map((claim: any, index: number) => (
            <tr key={index}>
              <td className="border-b border-gray-200 py-2">
                {claim?.insurance?.name}
              </td>
              <td className="border-b border-gray-200 py-2">
                {claim?.therapyProvider?.firstName}{" "}
                {claim?.therapyProvider?.lastName}
              </td>
              <td className="border-b border-gray-200 py-2">
                {claim?.service?.name}
              </td>

              <td className="border-b border-gray-200 py-2">{claim.details}</td>
              <td className="border-b border-gray-200 py-2">{claim.status}</td>
              <td className="border-b border-gray-200 py-2 flex h-9 space-x-4">
                <PencilSquareIcon
                  className="cursor-pointer"
                  onClick={() => handleEdit(claim)}
                />
                {userRole === "user" ? null : (
                  <TrashIcon
                    className="text-dangerRed cursor-pointer"
                    onClick={() => handleDelete(claim)}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
