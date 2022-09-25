import React, { useState, useCallback, useContext, useEffect } from "react";
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/Loader'
import { TripsList } from "../components/TripsList";
import { TripRequestContext } from "../context/TripRequestContext";

export const TripsPage = () => {
    const [trips, setTrips] = useState([])
    const { loading, request } = useHttp()
    const { token } = useContext(AuthContext)
    const tripRequest = useContext(TripRequestContext);
    const form = { from: tripRequest.from, to: tripRequest.to, date: tripRequest.date }

    const fetchTrips = useCallback(async () => {
        try {

            const fetched = await request('/api/trip/search', 'POST', { ...form }, {
                Authorization: `Bearer ${token}`
            })
            console.log(form);
            setTrips(fetched)
        } catch (e) { }
    }, [token, request])

    useEffect(() => {
        fetchTrips()
    }, [fetchTrips])

    if (loading || !trips) {
        return <Loader />
    }

    return (
        <>
            <div style={{ marginTop: '100px', marginLeft: '320px' }}>
                {!loading && <TripsList trips={trips} />}
            </div>
        </>
    )
}