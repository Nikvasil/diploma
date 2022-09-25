import React, { useState, useCallback, useContext, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { VehiclesList } from "./VehiclesList";
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/Loader'
import { AddCarButton } from '../components/buttons/AddCarButton'

export const ProfileCard = ({ user }) => {
    const params = useParams();
    const [vehicles, setVehicles] = useState([])
    const { loading, request } = useHttp()
    const { userId, token } = useContext(AuthContext)

    const fetchVehicles = useCallback(async () => {
        try {
            const fetched = await request(`/api/vehicle/${params.id}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setVehicles(fetched)
        } catch (e) { }
    }, [token, request])

    useEffect(() => {
        fetchVehicles()
    }, [fetchVehicles])

    if (loading) {
        return <Loader />
    }

    function calculateAge(birthday) {
        let ageDifMs = Date.now() - birthday.getTime();
        let ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    return (
        <>
            <div className="profileCard">
                <ul>
                    <li className="userName">
                        <span className="userName">
                            {user.firstName}
                        </span>
                        <span style={{ float: 'right' }}>
                            {user.rating}% <i className="material-icons prefix" style={{ fontSize: '22px' }}>star</i>
                        </span>
                    </li>
                    <li className="userAge">
                        <span>
                            {calculateAge(new Date(user.birthDate))} y.o.
                        </span>
                    </li>
                    <li className="userGender">
                        <span>
                            {user.gender}
                        </span>
                    </li>
                </ul>

                <div className="profileDivider" />

                <ul>
                    <li>
                        <table>
                            <tbody>
                                <tr>
                                    <td> <i className="material-icons prefix" style={{ fontSize: '22px', marginRight: '20px' }}>email</i> <span className="userEmail"> {user.email} </span> </td>
                                </tr>
                                <tr>
                                    <td> <i className="material-icons prefix" style={{ fontSize: '22px', marginRight: '20px' }}>phone</i> <span className="userTel"> {user.tel} </span> </td>
                                </tr>
                            </tbody>
                        </table>
                    </li>
                </ul>

                <div className="profileDivider" />
                <ul>
                    <li>
                        {!loading && <VehiclesList vehicles={vehicles} />}
                    </li>
                    {userId === params.id && <AddCarButton />}
                </ul>
            </div>
        </>
    )
}