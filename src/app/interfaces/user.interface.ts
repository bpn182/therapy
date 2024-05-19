export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  role: "USER" | "THERAPY" | "INSURANCE" | "ADMIN";
}
