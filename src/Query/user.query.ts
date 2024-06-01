import { useQuery } from "@tanstack/react-query";
import Api from "@/api/api";

export const useUserListQuery = (role?: string) => {
  return useQuery({
    queryKey: ["userList", role],
    queryFn: () => Api.listUsers(role),
  });
};
