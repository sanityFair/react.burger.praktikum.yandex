import { useState, useEffect, useCallback } from "react";

type Method = "GET" | "POST" | "PUT" | "DELETE";

type FetchParams = {
  url: string;
  method?: Method;
  payload?: any;
};

type FetchState<T> = {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
};

export const useFetch = <T>({
  url,
  method = "GET",
  payload,
}: FetchParams): FetchState<T> => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const fetchData = useCallback(async (): Promise<void> => {
    setState({ ...state, isLoading: true, error: null });
    try {
      const response = await fetch(url, {
        method,
        body: payload ? JSON.stringify(payload) : undefined,
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setState({ ...state, data, isLoading: false });
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        error: error instanceof Error ? error : new Error(String(error)),
      });
    }
  }, [url, method, payload]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return state;
};
