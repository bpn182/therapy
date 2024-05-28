import { IPathConfig } from "@/app/interfaces/index.interface";

export const userPathConfig: IPathConfig = {
  "/user": {
    mainText: "Hello, ",
    highlightText: "Bipin",
    subText: "Welcome to Alt Therapy",
  },
  "/user/claim/list": {
    mainText: "Your ",
    highlightText: "Claims",
  },
  "/user/claim/add": {
    mainText: "Claim ",
    highlightText: "Insurance",
  },
  "/user/claim/update": {
    mainText: "Update ",
    highlightText: "Insurance",
  },
  "/user/appointment/list": {
    mainText: "Your ",
    highlightText: "Appointments",
  },
  "/user/appointment/add": {
    mainText: "Create an ",
    highlightText: "Appointment",
  },
  "/user/appointment/update": {
    mainText: "Update ",
    highlightText: "Appointment",
  },
  "/user/account-settings": {
    mainText: "Account ",
    highlightText: "Settings",
  },
};
