import { create } from "zustand";
import { getItemFromLocalStorage, setItemInLocalStorage } from "./localStorage";
import { Insurance } from "@prisma/client";

export interface IStore {
  appointment: any;
  setAppointment: (appointment: any) => void;
  claim: any;
  setClaim: (appointment: any) => void;
  doctor: any;
  setDoctor: (doctor: any) => void;
  service: any | null;
  setService: (service: any | null) => void;
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
  user: any;
  setUser: (user: any) => void;
  insurance: Insurance | null;
  setInsurance: (insurance: Insurance) => void;
  tempUser: any;
  setTempUser: (tempUser: any) => void;
  loggedInsurance: Insurance | null;
  setLoggedInsurance: (loggedInsurance: Insurance | null) => void;
}

export const useTherapyStore = create<IStore>((set) => ({
  appointment: null,
  setAppointment: (appointment) => set({ appointment }),
  claim: null,
  setClaim: (claim) => set({ claim }),
  doctor: null,
  setDoctor: (doctor) => set({ doctor }),
  service: null,
  setService: (service) => set({ service }),
  accessToken: getItemFromLocalStorage("accessToken"),
  setAccessToken: (accessToken) => {
    setItemInLocalStorage("accessToken", accessToken);
    set({ accessToken });
  },
  user: getItemFromLocalStorage("user")
    ? JSON.parse(String(getItemFromLocalStorage("user")))
    : null,
  setUser: (user) => {
    if (user) {
      setItemInLocalStorage("user", JSON.stringify(user));
    } else {
      setItemInLocalStorage("user", null);
    }
    set({ user });
  },
  insurance: null,
  setInsurance: (insurance) => set({ insurance }),
  tempUser: null,
  setTempUser: (tempUser) => set({ tempUser }),
  loggedInsurance: getItemFromLocalStorage("loggedInsurance")
    ? JSON.parse(String(getItemFromLocalStorage("loggedInsurance")))
    : null,
  setLoggedInsurance: (loggedInsurance: any) => {
    if (loggedInsurance) {
      setItemInLocalStorage("loggedInsurance", JSON.stringify(loggedInsurance));
    } else {
      setItemInLocalStorage("loggedInsurance", null);
    }
    set({ loggedInsurance });
  },
}));
