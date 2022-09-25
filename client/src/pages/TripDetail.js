import { useNavigate, useParams } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook'
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from '../context/AuthContext'
import { Loader } from '../components/Loader';
import { TripCard } from '../components/TripCard';

export const TripDetail = () => {
    const params = useParams();
    const { token } = useContext(AuthContext)
    const { request, loading } = useHttp()
    const [trip, setTrip] = useState(null)

    const getTrip = useCallback(async () => {
        try {
            const fetched = await request(`/api/trip/${params.id}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setTrip(fetched)

        } catch (e) { }
    }, [token, request])

    useEffect(() => {
        getTrip()
    }, [getTrip])

    if (loading) {
        return <Loader />
    }

    return (
        <>
            {!loading && trip && <TripCard trip={trip} />}
        </>
    )
}