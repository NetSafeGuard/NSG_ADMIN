import * as C from './style';
import { UserHook } from '../../services/hooks/UserHook';
import { Navigate } from 'react-router-dom';
import { Loading } from '../../components/loading';

export const DashboardPage = () => {
    const { user, isLoading, error } = UserHook();
    
    if(isLoading) return <Loading />
    if(error) return (<h1>{error}</h1>)
    if(!user) return (<Navigate to="/" />)

    return (
        <>
            <h1>User Email: {user.email}</h1>
        </>
    )

};