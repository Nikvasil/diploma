import React, { useState, useCallback, useContext, useEffect } from "react";
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { Loader } from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import { useMessage } from "../hooks/message.hook";

export const CreatePage = () => {
    const auth = useContext(AuthContext);
    const [vehicles, setVehicles] = useState([]);
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);
    const message = useMessage();
    const { loading, request, error, clearError } = useHttp();
    const [form, setForm] = useState({
        from: '', to: '', date: '', price: '', vehicle: ''
    })

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    useEffect(() => {
        message(error);
        clearError()
    }, [error, message, clearError])

    const fetchVehicles = useCallback(async () => {
        try {
            const fetched = await request('/api/vehicle', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setVehicles(fetched)
        } catch (e) { }
    }, [token, request])

    useEffect(() => {
        fetchVehicles()
    }, [fetchVehicles])

    const createHandler = async () => {
        try {
            const data = await request('/api/trip/create', 'POST', { ...form }, {
                Authorization: `Bearer ${auth.token}`
            })
            message(data.message);
            navigate(`/createdtrips/${auth.userId}`);
        } catch (error) { }
    }

    if (loading) {
        return <Loader />
    }

    return (
        <>
            <div className="createTrip">
                <span>
                    Where are you going?
                </span>
            </div>

            <div className="vehicleCard">
                <div className="row" style={{
                    width: '500px'
                }}>
                    <div className="input-field col s12">
                        <input
                            id="from"
                            type="text"
                            name="from"
                            className="validate" style={{
                                fontSize: '20px',
                                color: 'white'
                            }}
                            onChange={changeHandler}
                            disabled={loading}
                            value={form.from} />
                        <label htmlFor="from">From</label>
                    </div>
                </div>

                <div className="row" style={{
                    width: '500px'
                }}>
                    <div className="input-field col s12">
                        <input
                            id="to"
                            type="text"
                            name="to"
                            className="validate"
                            style={{
                                fontSize: '20px',
                                color: 'white'
                            }}
                            onChange={changeHandler}
                            disabled={loading}
                            value={form.to} />
                        <label htmlFor="to">To</label>
                    </div>
                </div>

                <div className="row" style={{
                    width: '500px'
                }}>
                    <div className="input-field col s12">
                        <input
                            id="date"
                            type="date"
                            name="date"
                            className="validate"
                            min={new Date().toISOString().slice(0, 10)}
                            style={{
                                fontSize: '20px',
                                color: 'white',
                                colorScheme: 'dark'
                            }}
                            onChange={changeHandler}
                            disabled={loading}
                            value={form.date} />
                        <label htmlFor="date">When</label>
                    </div>
                </div>

                <div className="row" style={{
                    width: '500px'
                }}>
                    <div className="input-field col s12">
                        <input
                            id="price"
                            type="text"
                            name="price"
                            className="validate"
                            style={{
                                fontSize: '20px',
                                color: 'white'
                            }}
                            onChange={changeHandler}
                            disabled={loading}
                            value={form.price} />
                        <label htmlFor="price">Price</label>
                    </div>
                </div>

                <div className="row" style={{
                    width: '500px'
                }}>
                    <label>Vehicle</label>
                    <select
                        name="vehicle"
                        onChange={changeHandler}
                        disabled={loading}
                        value={form.vehicle}
                        className="browser-default"
                        style={{
                            backgroundColor: 'black',
                            color: 'white'
                        }}>
                        <option value="" disabled>  </option>
                        {vehicles.map((vehicle) => {
                            return (
                                <option key={vehicle._id} value={vehicle._id}>{vehicle.mark + ' ' + vehicle.model}</option>
                            )
                        })}
                    </select>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <button
                        className="btn waves-effect waves-light" style={{
                            backgroundColor: '#ffb300',
                            width: '500px',
                            marginTop: '60px',
                            fontSize: '16px',
                            textShadow: '1px 1px 2px black'
                        }}
                        onClick={createHandler}
                        type="submit"
                        name="action"
                    >
                        create trip
                    </button>
                </div>
            </div>
        </>
    )
}