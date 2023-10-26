import {Routes, Route} from 'react-router-dom';

import { LoginPage } from '../pages/Login';

export const RoutesList = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage/>} />
        </Routes>
    )
}