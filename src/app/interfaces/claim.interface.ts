export interface IClaim {
  _id: string;
  insuranceProvider: string;
  claimType: string;
  claimDetails: string;
  date: string;
  status: string;
  file?: string;
  feedback?: string;
  user:string;
}
