import { useQuery } from "@tanstack/react-query";
import Api from "@/api/api";

export const useInsuranceListQuery = () => {
  return useQuery({
    queryKey: ["insuranceList"],
    queryFn: () => Api.listInsurance(),
  });
};
