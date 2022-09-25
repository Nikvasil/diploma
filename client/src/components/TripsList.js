import { useNavigate } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook'
import React from "react";
import { Loader } from '../components/Loader'
import { CheckIcon } from '../components/CheckIcon';

export const TripsList = ({ trips }) => {
    const navigate = useNavigate();
    const { loading } = useHttp();

    if (loading) {
        return <Loader />
    }

    return (
        <>
            <ul>
                {trips.map((trip) => {
                    return (
                        <li key={trip._id} onClick={() => {
                            navigate(`/tripdetail/${trip._id}`);
                        }}>
                            <div className='tripCard'>
                                <div className='tripCity'>
                                    {trip.from} → {trip.to}
                                    <span style={{float: 'right', marginRight: '20px'}}>
                                        {(trip.isDone === true) && <CheckIcon />}
                                    </span>
                                </div>
                                <div className='tripDetail'>
                                    {new Date().toISOString().slice(0, 10)}
                                    <span className='tripPrice'> {trip.price}₴ </span>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}
