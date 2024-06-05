import useSWR  from 'swr';
import { api } from '../api';
import type { User } from '@/@types/User';

const fetcher = (url: string) => api.post(url).then(res => res.data.data.user)

export const UserHook = () => {
    const { data, error } = useSWR('/auth/verify', fetcher, {refreshInterval: 2500, revalidateOnFocus: true})

    return {
        user: data as User,
        isLoading: !error && !data,
        error: error
    }
}