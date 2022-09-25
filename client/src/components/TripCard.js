import { useNavigate } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook'
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from '../context/AuthContext'
import { Loader } from '../components/Loader';
import { CancelButton } from '../components/buttons/CancelButton';
import { DoneButton } from '../components/buttons/DoneButton';
import { JoinButton } from '../components/buttons/JoinButton';
import { LeaveButton } from '../components/buttons/LeaveButton';
import { CheckIcon } from '../components/CheckIcon';

export const TripCard = (trip) => {
    const navigate = useNavigate();
    const { token, userId } = useContext(AuthContext)
    const { request, loading } = useHttp()
    const [user, setUser] = useState(null)
    const [passenger, setPassenger] = useState(null)
    const [vehicle, setVehicle] = useState(null)

    const getUser = useCallback(async () => {
        try {
            const fetched = await request(`/api/user/${trip.trip.owner}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setUser(fetched)
        } catch (e) { }
    }, [token, userId, request])

    useEffect(() => {
        getUser()
    }, [getUser])

    const getPassenger = useCallback(async () => {
        try {
            if (trip.trip.joiner !== null) {
                const fetched = await request(`/api/user/${trip.trip.joiner}`, 'GET', null, {
                    Authorization: `Bearer ${token}`
                })
                setPassenger(fetched)
            }
        } catch (e) { }
    }, [token, userId, request])

    useEffect(() => {
        getPassenger()
    }, [getPassenger])

    const getVehicle = useCallback(async () => {
        try {
            const fetched = await request(`/api/vehicle/trip/${trip.trip.vehicle}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setVehicle(fetched)
        } catch (e) { }
    }, [token, userId, request])

    useEffect(() => {
        getVehicle()
    }, [getVehicle])

    const driverHandler = async () => {
        try {
            navigate(`/profile/${trip.trip.owner}`);
        } catch (e) { }
    }

    const passengerHandler = async () => {
        try {
            if (trip.trip.joiner != null) navigate(`/profile/${trip.trip.joiner}`);
        } catch (e) { }
    }

    if (trip.trip.joiner !== null) {
        if (loading || !user || !passenger || !vehicle) {
            return <Loader />
        }
    }

    if (loading || !user || !vehicle) {
        return <Loader />
    }

    return (
        <>
            <div className="profileCard">
                <ul>
                    <li className="userName">
                        <span className="userName">
                            {trip.trip.from} → {trip.trip.to}
                        </span>
                        <span style={{ float: 'right', marginTop: '10px' }}>
                            {(trip.trip.isDone === true) && <CheckIcon />}
                        </span>
                    </li>
                    <li className="tripDetail">
                        <span className="userAge">
                            {trip.trip.depDate.slice(0, 10)}
                        </span>
                    </li>
                    <li className="userAge">
                        <span className="userAge">
                            {trip.trip.price}₴
                        </span>
                    </li>
                </ul>

                <div className="profileDivider" />

                <table>
                    <tbody>
                        <tr onClick={driverHandler} className="tripName">
                            <td> <i className="material-icons prefix" style={{ fontSize: '22px', marginRight: '20px' }}>account_circle</i> <span className="userEmail"> {user.firstName} </span> </td>
                        </tr>
                        <tr onClick={passengerHandler} className="tripName">
                            <td> <i className="material-icons prefix" style={{ fontSize: '22px', marginRight: '20px' }}>group_add</i> <span className="userEmail"> {(trip.trip.joiner != null) && passenger.firstName} </span> </td>
                        </tr>
                    </tbody>
                </table>

                <div className="profileDivider" />
                <table>
                    <tbody>
                        <tr>
                            <td> <i className="material-icons prefix" style={{ fontSize: '22px', marginRight: '20px' }}>directions_car</i> <span className="userEmail"> {vehicle.mark} {vehicle.model} </span> </td>
                        </tr>
                    </tbody>
                </table>
                {(trip.trip.isDone !== true && userId === trip.trip.owner && trip.trip.joiner !== null) && <DoneButton tripId={trip.trip._id} />}
                {(trip.trip.isDone !== true && userId === trip.trip.owner) && <CancelButton tripId={trip.trip._id} />}
                {(trip.trip.isDone !== true && userId !== trip.trip.owner && trip.trip.joiner === null) && <JoinButton tripId={trip.trip._id} />}
                {(trip.trip.isDone !== true && userId === trip.trip.joiner) && <LeaveButton tripId={trip.trip._id} />}
            </div>

        </>
    )
}