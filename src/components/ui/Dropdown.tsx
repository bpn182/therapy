import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment, ReactNode, FC } from "react";

interface IMenuItem {
  name: string;
  href: string;
  icon: ReactNode;
  disabled: boolean;
}

interface IDropdownProps {
  menuItems: IMenuItem[];
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const Dropdown: FC<IDropdownProps> = ({ menuItems }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 px-3 py-2 text-sm font-semibold  shadow-sm text-white">
          <svg width="22" height="24" viewBox="0 0 16 17" fill="none">
            <path
              d="M11.3346 7.83203L8.00131 11.1654L4.66797 7.83203"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className=" rounded-2xl absolute right-0 z-10 mt-2 w-56 origin-top-right bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-4 px-4 rounded-xl divide-y divide-gray-200  ">
            {menuItems.map((item: IMenuItem) => (
              <Menu.Item key={item.href}>
                {({ active }) => (
                  <Link
                    href={item.href}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm font-medium cursor-pointer"
                    )}
                  >
                    <div className="flex items-center">
                      {item.icon}
                      {item.name}
                    </div>
                  </Link>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Dropdown;
