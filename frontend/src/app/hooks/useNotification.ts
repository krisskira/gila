import { useCallback, useState } from "react";
import { ApiHook, Notification } from "../interfaces";

export const useNotificationService = (): ApiHook<{ totals: number }> => {
  const [result, setResult] = useState<{ totals: number }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const sendNotification = useCallback(async (notification: Notification) => {
    try {
      setLoading(true);
      const request = await fetch(
        import.meta.env.VITE_SERVER_URL + "messages",
        {
          method: "POST",
          body: JSON.stringify(notification),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const success = (await request.json()) as {
        totals: number;
        message?: string;
      };
      if (request.status >= 400) {
        throw new Error(success?.message ?? "No se puede enviar el mensaje");
      }
      setError(undefined);
      setResult(success);
    } catch (error) {
      setError(error?.toString());
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = () => {
    setResult(undefined);
    setLoading(false);
    setError(undefined);
  };

  return [result, sendNotification, { loading, error, reset }];
};
