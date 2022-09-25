import React, { useContext, useState, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import { useNavigate } from 'react-router-dom';
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../context/AuthContext";

export const CreateVehiclePage = () => {
    const navigate = useNavigate();
    const message = useMessage();
    const auth = useContext(AuthContext);
    const { loading, request, error, clearError } = useHttp();
    const [form, setForm] = useState({
        registrationPlate: '', mark: '', model: ''
    })

    useEffect(() => {
        message(error);
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const addVehicle = async () => {
        try {
            const data = await request('/api/vehicle/add_vehicle', 'POST', { ...form }, {
                Authorization: `Bearer ${auth.token}`
            })
            message(data.message);
            navigate(`/profile/${auth.userId}`);
        } catch (e) { }
    }

    return (
        <>
            <div className="vehicle">
                <span>
                    What is your vehicle?
                </span>
            </div>
            <div className="vehicleCard">
                <div className="row">
                    <div className="input-field col s3">
                        <input id="regPlate" type="text" className="validate" style={{
                            color: 'white'
                        }}
                            disabled={loading}
                            onChange={changeHandler}
                            value={form.registrationPlate}
                            name="registrationPlate" />
                        <label for="regPlate">Registration plate</label>
                    </div>
                    <div className="input-field col s3">
                        <input id="mark" type="text" className="validate" style={{
                            color: 'white'
                        }}
                            disabled={loading}
                            onChange={changeHandler}
                            value={form.mark}
                            name="mark" />
                        <label for="mark">Mark</label>
                    </div>
                    <div className="input-field col s3">
                        <input id="model" type="text" className="validate" style={{
                            color: 'white'
                        }}
                            disabled={loading}
                            onChange={changeHandler}
                            value={form.model}
                            name="model" />
                        <label for="model">Model</label>
                    </div>
                    <div className="input-field col s3" style={{ marginTop: '44px' }}>
                        <button
                            className="btn waves-effect waves-light" style={{
                                backgroundColor: '#ffb300',
                                marginRight: 10,
                                fontSize: '16px',
                                textShadow: '1px 1px 2px black',
                                width: '200px'
                            }}
                            onClick={addVehicle}
                            type="submit"
                            name="action"
                        >
                            add vehicle
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}