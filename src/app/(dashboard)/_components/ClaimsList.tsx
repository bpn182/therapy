"use client";
import { IClaim } from "@/app/interfaces/claim.interface";
import { TitleWithLine } from "@/components/ui/TitleWithLine";
import { mockClaims } from "@/constants/mock";
import { useTherapyStore } from "@/store/zustand";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";



export default function ClaimsList() {
  const router = useRouter();
  const { setClaim } = useTherapyStore();

  const handleEdit = (claim: IClaim) => {
    setClaim(claim);
    router.push("/insurance/claim/update");
  };

  return (
    <>
      <TitleWithLine title="Claims" />
      <table className="w-full text-left text-sm mt-2">
        <thead>
          <tr>
            <th className="border-b-2 border-gray-300 py-2 font-semibold">
              User
            </th>
            <th className="border-b-2 border-gray-300 py-2 font-semibold">
              Type
            </th>
            <th className="border-b-2 border-gray-300 py-2 font-semibold">
              Details
            </th>
            <th className="border-b-2 border-gray-300 py-2 font-semibold">
              Date
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
          {mockClaims.map((claim, index) => (
            <tr key={index}>
              <td className="border-b border-gray-200 py-2">{claim.user}</td>
              <td className="border-b border-gray-200 py-2">
                {claim.claimType}
              </td>
              <td className="border-b border-gray-200 py-2">
                {claim.claimDetails}
              </td>

              <td className="border-b border-gray-200 py-2">{claim.date}</td>
              <td className="border-b border-gray-200 py-2">{claim.status}</td>
              <td className="border-b border-gray-200 py-2 flex h-9 space-x-4">
                <PencilSquareIcon
                  className="cursor-pointer"
                  onClick={() => handleEdit(claim)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
