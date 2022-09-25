import React, { useState, useCallback, useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/Loader'
import { TripsList } from "../components/TripsList";

export const CreatedTripsPage = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const [trips, setTrips] = useState([])
    const { loading, request } = useHttp()
    const { token } = useContext(AuthContext)

    const fetchTrips = useCallback(async () => {
        try {
            const fetched = await request('/api/trip/created', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setTrips(fetched)
        } catch (e) { }
    }, [token, request])

    useEffect(() => {
        fetchTrips()
    }, [fetchTrips])

    const joinedTripsHandler = async () => {
        try {
            navigate(`/joinedtrips/${auth.userId}`);
        } catch (e) { }
    }

    if (loading) {
        return <Loader />
    }

    return (
        <>
            <table style={{ marginLeft: '340px', marginTop: '80px', fontSize: '26px' }}>
                <thead>
                    <tr className="tripItem">
                        <th className="tripItem"
                            style={{
                                textAlign: 'center',
                                borderBottom: '2px solid #ffb300',
                                color: '#ffb300',
                                width: '300px'
                            }}>
                            CREATED
                        </th>
                        <th className="tripItem"
                            onClick={joinedTripsHandler}
                            style={{
                                textAlign: 'center',
                                borderBottom: '2px solid white',
                                color: 'white',
                                width: '300px'
                            }}>
                            JOINED
                        </th>
                    </tr>
                </thead>
            </table>
            <div style={{ marginTop: '100px', marginLeft: '320px' }}>
                {!loading && <TripsList trips={trips} />}
            </div>
        </>
    )
}