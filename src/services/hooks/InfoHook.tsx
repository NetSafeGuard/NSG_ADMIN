import useSWR from "swr";
import { api } from "../api";

const fetcher = (url: string) => api.get(url).then((res) => res.data.data);

export const InfoHook = () => {
  const { data, error } = useSWR("/info/", fetcher, {
    refreshInterval: 4000,
    revalidateOnFocus: true,
  });
  return {
    users: data?.users,
    isLoading: !error && !data,
    error: error,
  };
};
