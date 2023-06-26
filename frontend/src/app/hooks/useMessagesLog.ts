import { useCallback, useState } from "react";
import { ApiHook, MessageLog } from "../interfaces";

export const useMessagesLogService = (): ApiHook<MessageLog[]> => {
  const [data, setData] = useState<MessageLog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const request = await fetch(
        import.meta.env.VITE_SERVER_URL + "messages/logs"
      );
      const logs = (await request.json()) as MessageLog[];
      setData(logs);
    } catch (error) {
      setError(error?.toString());
    } finally {
      setLoading(false);
    }
  }, []);

  return [data, getData, { loading, error }];
};
