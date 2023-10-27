import * as C from './style';
import { useContext } from 'react';
import { AuthContext } from '../../global/contexts/authcontext';
import { Navigate } from 'react-router-dom';

export const DashboardPage = () => {
    const { user } = useContext(AuthContext);
    console.log(user)
    return (
        <div>
            <h1>User Email: {user.email}</h1>
        </div>
    )
};