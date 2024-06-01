import { useQuery } from "@tanstack/react-query";
import Api from "@/api/api";

export const useServicesList = (providerId?: string, userId?: string) => {
  return useQuery({
    queryKey: ["servicesList"],
    queryFn: () => Api.listServices(providerId, userId),
  });
};
