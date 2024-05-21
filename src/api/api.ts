// api/api.ts
import { AxiosInstance } from "axios";
import { axiosInstance } from "./axiosConfig";
import { IUser } from "@/app/interfaces/user.interface";

class API {
  private api: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.api = instance;
  }

  public registerUser = async (user: IUser) => {
    const response = await this.api.post(`/auth/signup`, user);
    return response;
  };

  public login = async (user: IUser) => {
    const response = await this.api.post(`/auth/signin`, user);
    return response;
  };

  // Users
  public listUsers = async (role?: string) => {
    const response = await this.api.get(`/user?role=${role}`);
    return response.data;
  };

  // Therapy Services
  public addService = async (service: any) => {
    const response = await this.api.post(`/therapy/service`, service);
    return response;
  };

  public listServices = async (providerId?: string) => {
    const response = await this.api.get(`/therapy/service?${providerId}`);
    return response.data;
  };

  public updateServiceById = async (id: string, data: any) => {
    const response = await this.api.put(`/therapy/service/${id}`, data);
    return response.data;
  };

  public deleteServiceById = async (id: string) => {
    const response = await this.api.delete(`/therapy/service/${id}`);
    return response.data;
  };

  // Therapy Doctors
  public addDoctor = async (doctor: any) => {
    const response = await this.api.post(`/therapy/doctor`, doctor);
    return response;
  };

  public listDoctors = async (providerId?: string) => {
    const response = await this.api.get(`/therapy/doctor?${providerId}`);
    return response.data;
  };

  public updateDoctorById = async (id: string, data: any) => {
    const response = await this.api.put(`/therapy/doctor/${id}`, data);
    return response.data;
  };

  public deleteDoctorById = async (id: string) => {
    const response = await this.api.delete(`/therapy/doctor/${id}`);
    return response.data;
  };

  //Appointments
  public addAppointment = async (appointment: any) => {
    const response = await this.api.post(`/user/appointment`, appointment);
    return response;
  };

  public listAppointments = async (providerId?: string, userId?: string) => {
    const response = await this.api.get("/user/appointment", {
      params: {
        providerId: providerId,
        userId: userId,
      },
    });
    return response.data;
  };

  public updateAppointmentById = async (id: string, data: any) => {
    const response = await this.api.put(`/user/appointment/${id}`, data);
    return response.data;
  };

  public deleteAppointmentById = async (id: string) => {
    const response = await this.api.delete(`/user/appointment/${id}`);
    return response.data;
  };

  // Insurance
  public addInsurance = async (insurance: any) => {
    const response = await this.api.post(`/insurance`, insurance);
    return response;
  };

  public listInsurance = async () => {
    const response = await this.api.get(`/insurance`);
    return response.data;
  };

  // claims
  public addClaim = async (claim: any) => {
    const response = await this.api.post(`/claim`, claim);
    return response;
  };

  public listClaims = async (
    userId?: string,
    insuranceId?: string,
    therapyProviderId?: string,
    serviceId?: string
  ) => {
    const response = await this.api.get(`/claim`, {
      params: {
        userId,
        insuranceId,
        therapyProviderId,
        serviceId,
      },
    });
    return response.data;
  };

  public updateClaimById = async (id: string, data: any) => {
    const response = await this.api.put(`/claim/${id}`, data);
    return response.data;
  };

  public deleteClaimById = async (id: string) => {
    const response = await this.api.delete(`/claim/${id}`);
    return response.data;
  };
}
const Api = new API(axiosInstance);
export default Api;
