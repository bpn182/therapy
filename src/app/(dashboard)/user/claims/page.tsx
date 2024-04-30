import { TitleWithLine } from "@/components/ui/TitleWithLine";

const claims = [
  {
    claimType: "Physiotherapy",
    claimDetails: "Session with Dr. Smith",
    date: "2022-01-01",
  },
  {
    claimType: "Acupuncture",
    claimDetails: "Session with Dr. Johnson",
    date: "2022-01-02",
  },
  {
    claimType: "Physiotherapy",
    claimDetails: "Session with Dr. Williams",
    date: "2022-01-03",
  },
  {
    claimType: "Acupuncture",
    claimDetails: "Session with Dr. Davis",
    date: "2022-01-04",
  },
];

export default function Claims() {
  return (
    <>
      <TitleWithLine title="Claims" />
      <table className="w-full text-left text-sm mt-2">
        <thead>
          <tr>
            <th className="border-b-2 border-gray-300 py-2 font-semibold">
              Type
            </th>
            <th className="border-b-2 border-gray-300 py-2 font-semibold">
              Details
            </th>
            <th className="border-b-2 border-gray-300 py-2 font-semibold">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {claims.map((claim, index) => (
            <tr key={index}>
              <td className="border-b border-gray-200 py-2">
                {claim.claimType}
              </td>
              <td className="border-b border-gray-200 py-2">
                {claim.claimDetails}
              </td>
              <td className="border-b border-gray-200 py-2">{claim.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
