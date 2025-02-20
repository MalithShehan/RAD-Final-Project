import React from "react";
import Navigation from "../navigation/Navigation";
import { Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    return (
        <div className="flex">
            <div className="flex-[1.8] ring-1 ring-slate-200 min-h-screen">
                <Navigation/>
            </div>
            <div className="flex-[10.2] ">
                <Outlet/>
            </div>
        </div>
    );
}

export default ProtectedRoute;