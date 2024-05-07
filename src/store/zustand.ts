import { IAppointment } from "@/app/interfaces/appointment.interface";
import { IClaim } from "@/app/interfaces/claim.interface";
import { IDoctor } from "@/app/interfaces/doctor.interace";
import { IService } from "@/app/interfaces/services.interface";
import { create } from "zustand";

export interface IStore {
  appointment: IAppointment | null;
  setAppointment: (appointment: IAppointment | null) => void;
  claim: IClaim | null;
  setClaim: (appointment: IClaim | null) => void;
  doctor: IDoctor | null;
  setDoctor: (doctor: IDoctor | null) => void;
  service: IService | null;
  setService: (service: IService | null) => void;
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
}));
