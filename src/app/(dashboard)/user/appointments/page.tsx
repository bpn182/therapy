import Button from "@/components/form/Button";
import { TitleWithLine } from "@/components/ui/TitleWithLine";
import Link from "next/link";

const appointments = [
  {
    customer: "Bipin Bhandari",
    doctor: "Dr. Smith",
    date: "2022-01-01",
    time: "10:00 AM",
  },
  {
    customer: "Bipin Bhandari",
    doctor: "Dr. Johnson",
    date: "2022-01-02",
    time: "2:00 PM",
  },
  {
    customer: "Bipin Bhandari",
    doctor: "Dr. Williams",
    date: "2022-01-03",
    time: "1:00 PM",
  },
  {
    customer: "Bipin Bhandari",
    doctor: "Dr. Davis",
    date: "2022-01-04",
    time: "3:00 PM",
  },
];

export default function Appointments() {
  return (
    <>
      {/* <TitleWithLine title="Appointments" /> */}

      <div className="flex justify-between align-middle">
        <div className="font-bold text-darkblue flex items-center">
          Appointments
        </div>
        <div className="w-48 text-sm text-white">
          <Link href="/user/create-appointment">
            <Button text="Create Appointment" />
          </Link>
        </div>
      </div>
      <table className="w-full text-left text-sm mt-2">
        <thead>
          <tr>
            <th className="border-b-2 border-gray-300 py-2 font-semibold">
              Customer
            </th>
            <th className="border-b-2 border-gray-300 py-2 font-semibold">
              Doctor
            </th>
            <th className="border-b-2 border-gray-300 py-2 font-semibold">
              Appointment Date
            </th>
            <th className="border-b-2 border-gray-300 py-2 font-semibold">
              Appointment Time
            </th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={index}>
              <td className="border-b border-gray-200 py-2">
                {appointment.customer}
              </td>
              <td className="border-b border-gray-200 py-2">
                {appointment.doctor}
              </td>
              <td className="border-b border-gray-200 py-2">
                {appointment.date}
              </td>
              <td className="border-b border-gray-200 py-2">
                {appointment.time}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
