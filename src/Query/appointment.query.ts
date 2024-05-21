import { useQuery } from "@tanstack/react-query";
import Api from "@/api/api";

interface IAppointmentListQueryParams {
  providerId?: string;
  userId?: string;
}

export const useAppoinmentListQuery = ({
  providerId,
  userId,
}: IAppointmentListQueryParams) => {
  return useQuery({
    queryKey: ["appoinmentList"],
    queryFn: () => Api.listAppointments(providerId, userId),
  });
};
