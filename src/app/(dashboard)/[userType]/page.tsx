import {
  HomeIcon,
  CalendarDaysIcon,
  DocumentIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Appointments from "./_components/Appointments";
import Claims from "./_components/Claims";

export default function UserPage() {
  const menuItems = [
    {
      text: "My Dashboard",
      icon: <HomeIcon />,
      href: "/dashboard",
    },
    {
      text: "Appointments",
      icon: <CalendarDaysIcon />,
      href: "/appointments",
    },
    {
      text: "Claims",
      icon: <DocumentIcon />,
      href: "/claims",
    },
  ];

  return (
    <main className="h-screen bg-gray-100">
      <div className="flex justify-center pt-8">
        <div className="px-4 py-4 bg-white rounded-xl mr-4 ml-24 w-72 divide-y divide-gray-200">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="flex group px-4 py-4 rounded-xl hover:bg-customGreen"
            >
              <div className="w-6 mr-4 text-customGreen group-hover:text-white">
                {item.icon}
              </div>

              <div className="font-medium group-hover:text-white">
                {item.text}
              </div>
            </a>
          ))}
        </div>

        {/* Top image section */}
        <div className="flex-1 flex flex-col">
          <div className="flex gap-x-4 h-28  text-white ">
            <div className="rounded-xl overflow-hidden bg-dashboard-top-image bg-cover bg-center w-2/3 flex flex-col justify-center pl-8 ">
              <div className="font-bold text-2xl">Hello, Bipin</div>
              <div>Welcome to Alt Therapy</div>
            </div>
            <div className="bg-darkblue rounded-xl px-8 pt-2 font-light">
              <div>
                <PlusIcon className="text-customGreen" />
              </div>
              <div className="text-sm">Add Claim</div>
            </div>
          </div>

          {/* Details */}
          <div className="bg-white flex flex-col  w-2/3  rounded-xl p-4 mt-4">
            {/* <Appointments /> */}
            <Claims />
          </div>
        </div>
      </div>
    </main>
  );
}
