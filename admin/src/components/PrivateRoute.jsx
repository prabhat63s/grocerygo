import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
    const { user, loading } = useAuth();

    if (loading ) {
        return (
            <div className="flex items-center justify-center p-4 h-screen">
                <span className="relative flex size-10">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neutral-800 opacity-75"></span>
                    <span className="relative inline-flex size-10 rounded-full bg-neutral-950"></span>
                </span>
            </div>
        );
    }

    return user ? <Outlet /> : <Navigate to="/admin/home" replace />;
};

export default PrivateRoute;
