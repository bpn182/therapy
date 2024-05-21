import { useQuery } from "@tanstack/react-query";
import Api from "@/api/api";

export const useDoctorListQuery = (providerId?: string) => {
  return useQuery({
    queryKey: ["doctorList"],
    queryFn: () => Api.listDoctors(providerId),
  });
};
