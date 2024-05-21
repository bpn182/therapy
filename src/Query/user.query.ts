import { useQuery } from "@tanstack/react-query";
import Api from "@/api/api";

export const useUserListQuery = (role?: string) => {
  return useQuery({
    queryKey: ["userList"],
    queryFn: () => Api.listUsers(role),
  });
};
