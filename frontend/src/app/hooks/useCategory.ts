import { useCallback, useState } from "react";
import { ApiHook, Category } from "../interfaces";

export const useCategoryService = (): ApiHook<Category[]> => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const getCategories = useCallback(async () => {
    try {
      setLoading(true);
      const request = await fetch(import.meta.env.VITE_SERVER_URL + "categories");
      const categories = (await request.json()) as Category[];
      setCategories(categories);
    } catch (error) {
      setError(error?.toString());
    } finally {
      setLoading(false);
    }
  }, []);

  return [categories, getCategories, { loading, error }];
};
