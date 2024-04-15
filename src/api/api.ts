// api/api.ts
import { AxiosInstance } from "axios";
import { axiosInstance } from "./axiosConfig";

class API {
  private api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  public async getBuyersById(id: string) {
    const response = await this.api.get(`/buyer/${id}`);
    return response.data;
  }
}
const apiInstance = new API(axiosInstance);
export default apiInstance;
