import React from "react";
import { Routes, Route } from 'react-router-dom';
import { CreatedTripsPage } from './pages/CreatedTripsPage';
import { JoinedTripsPage } from './pages/JoinedTripsPage';
import { SearchPage } from './pages/SearchPage';
import { CreatePage } from './pages/CreatePage';
import { ProfilePage } from './pages/ProfilePage';
import { TripDetail } from './pages/TripDetail';
import { AuthPage } from './pages/AuthPage';
import { RegPage } from './pages/RegPage';
import { TripsPage } from './pages/TripsPage';
import { FeedbackPage } from './pages/FeedbackPage';
import { CreateVehiclePage } from "./pages/CreateVehiclePage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <>
                <Routes>
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/create" element={<CreatePage />} />
                    <Route path="/createdtrips/:id" element={<CreatedTripsPage />} />
                    <Route path="/tripdetail/:id" element={<TripDetail />} />
                    <Route path="/joinedtrips/:id" element={<JoinedTripsPage />} />
                    <Route path="/profile/:id" element={<ProfilePage />} />
                    <Route path="/profile/create_vehicle" element={<CreateVehiclePage />} />
                    <Route path="/trips" element={<TripsPage />} />
                    <Route path="/feedback/:id" element={<FeedbackPage />} />
                </Routes>
            </>
        )
    }

    return (
        <>
            <Routes>
                <Route path="/" element={<AuthPage />} />
                <Route path="/register" element={<RegPage />} />
            </Routes>
        </>
    )
}