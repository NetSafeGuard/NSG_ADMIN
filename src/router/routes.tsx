import {Routes, Route} from 'react-router-dom';

import { LoginPage } from '../pages/Login';
import { DashboardPage } from '../pages/Dashboard';

export const RoutesList = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/dashboard" element={<DashboardPage/>} />
        </Routes>
    )
}