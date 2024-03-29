import Login from '../components/Login';
import { Routes as Switch, Route, BrowserRouter, Navigate } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import AuthRoutes from './AuthRoutes';
import Signup from '../components/Signup';
import ForgotPassword from '../components/ForgetPassword';
import VerifyUser from '../pages/VerifyOwner';
import ResetPassword from "../pages/ResetPassword";
import Dashboard from "../pages/Dashboard";

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" element={<PublicRoutes />}>
                    <Route path="" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                    <Route path="forgot-password" element={<ForgotPassword />} />
                    <Route path="verify" element={<VerifyUser />} />
                    <Route path="reset" element={<ResetPassword />} />
                </Route>
                <Route path="/" element={<AuthRoutes />}>
                    <Route path="dashboard" element={<Dashboard />} />
                </Route>
                <Route path="/404" element={<>Not Found</>} />
                <Route path="*" element={<Navigate to="/404" />} />
            </Switch>
        </BrowserRouter>
    )
}
