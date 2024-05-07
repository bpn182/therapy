import { IPathConfig } from "@/app/interfaces/index.interface";

export const therapyPathConfig: IPathConfig = {
  "/therapy": {
    mainText: "Hello, ",
    highlightText: "Bipin",
    subText: "Manage your therapy services here",
  },
  "/therapy/appointment/list": {
    mainText: "Your ",
    highlightText: "Appointments",
  },
  "/therapy/service/list": {
    mainText: "Your ",
    highlightText: "Services",
  },
  "/therapy/service/add": {
    mainText: "Add New ",
    highlightText: "Service",
  },
  "/therapy/service/update": {
    mainText: "Update ",
    highlightText: "Service",
  },
  "/therapy/doctor/list": {
    mainText: "Available ",
    highlightText: "Doctors",
  },
  "/therapy/doctor/add": {
    mainText: "New ",
    highlightText: "Doctor",
  },
  "/therapy/doctor/update": {
    mainText: "Update ",
    highlightText: "Doctor",
  },
};
