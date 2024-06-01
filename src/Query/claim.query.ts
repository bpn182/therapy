import { useQuery } from "@tanstack/react-query";
import Api from "@/api/api";

interface IAppointmentListQueryParams {
  userId?: string;
  insuranceId?: string;
  therapyProviderId?: string;
  serviceId?: string;
}

export const useClaimListQuery = ({
  userId,
  insuranceId,
  therapyProviderId,
  serviceId,
}: IAppointmentListQueryParams) => {
  return useQuery({
    queryKey: ["claimList"],
    queryFn: () =>
      Api.listClaims(userId, insuranceId, therapyProviderId, serviceId),
  });
};

export const useClaimStatListQuery = (provider?: string) => {
  return useQuery({
    queryKey: ["claimStatsList"],
    queryFn: () => Api.listClaimStats(provider),
  });
};
