import { Navigate, Outlet } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function ProtectedRoute() {

    const {token, loading} = useApp();

    if(loading) {
        return
        <div className="flex justify-center items-center bg-drak-900 min-h-screen">
            <div className="border-2 border-primary border-t-transparent rounded-full w-10 h-10 animate-spin" />
        </div>
    } 

    if(!token) {
        return <Navigate to="/login" replace/>
    }

    return <Outlet />;
}
