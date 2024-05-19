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
    const response = await this.api.post(`/auth/users/register`, user);
    return response;
  };
}
const Api = new API(axiosInstance);
export default Api;
