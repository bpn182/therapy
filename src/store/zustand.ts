import { IAppointment } from "@/app/interfaces/appointment.interface";
import { IClaim } from "@/app/interfaces/claim.interface";
import { IDoctor } from "@/app/interfaces/doctor.interace";
import { IService } from "@/app/interfaces/services.interface";
import { create } from "zustand";
import { getItemFromLocalStorage, setItemInLocalStorage } from "./localStorage";

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
    console.log("user", user);
    if (user) {
      setItemInLocalStorage("user", JSON.stringify(user));
    } else {
      setItemInLocalStorage("user", null);
    }
    set({ user });
  },
}));
