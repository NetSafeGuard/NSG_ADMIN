import useSWR  from 'swr';
import { api } from '../api';

const fetcher = (url: string) => api.post(url).then(res => res.data.data.user)

export const UserHook = () => {
    const { data, error } = useSWR('/auth/verify', fetcher, {refreshInterval: 2500, revalidateOnFocus: false})
    return {
        user: data,
        isLoading: !error && !data,
        error: error
    }
}