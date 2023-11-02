import * as C from './style';
import { UserHook } from '../../services/hooks/UserHook';
import { Navigate } from 'react-router-dom';
import { Loading } from '../../components/loading';
import { SideBar } from '../../components/SideBar';

export const DashboardPage = () => {
    const { user, isLoading, error } = UserHook();
    console.log(user)
    
    if(isLoading) return <Loading />
    if(error) return (<h1>{error}</h1>)
    if(!user) return (<Navigate to="/" />)

    return (
        <C.Container>
            <SideBar />
            <C.Content>
                <C.WelcomeText>👋 Olá {user.username}</C.WelcomeText>
            </C.Content>
        </C.Container>
    )

};