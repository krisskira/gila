import { useCallback, useState } from "react";
import { ApiHook, User } from "../interfaces";

export const useUserService = (): ApiHook<User[]> => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const getUsers = useCallback(async () => {
    try {
      setLoading(true);
      const request = await fetch(import.meta.env.VITE_SERVER_URL + "users");
      const users = (await request.json()) as User[];
      setUsers(users);
    } catch (error) {
      setError(error?.toString());
    } finally {
      setLoading(false);
    }
  }, []);

  return [users, getUsers, { loading, error }];
};
