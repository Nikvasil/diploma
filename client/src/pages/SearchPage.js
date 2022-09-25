import React, { useContext, useState, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import { useNavigate } from 'react-router-dom';
import { useMessage } from "../hooks/message.hook";
import { TripRequestContext } from "../context/TripRequestContext";

export const SearchPage = () => {
    const navigate = useNavigate();
    const message = useMessage();
    const tripRequest = useContext(TripRequestContext);
    const { loading, error, clearError } = useHttp();
    const [form, setForm] = useState({
        from: '', to: '', date: ''
    })

    useEffect(() => {
        message(error);
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const createRequest = async () => {
        try {
            tripRequest.from = form.from;
            tripRequest.to = form.to;
            tripRequest.date = form.date;
            navigate(`/trips`);
        } catch (e) { }
    }
    return (
        <>
            <div className="vehicle">
                <span>
                    Where do you wanna go?
                </span>
            </div>
            <div className="vehicleCard">
                <div className="row">
                    <div className="input-field col s3">
                        <input
                            id="from"
                            type="text"
                            className="validate"
                            style={{
                                color: 'white'
                            }}
                            name="from"
                            disabled={loading}
                            onChange={changeHandler}
                            value={form.from}
                        />
                        <label for="from">From</label>
                    </div>
                    <div className="input-field col s3">
                        <input
                            id="to"
                            type="text"
                            className="validate"
                            style={{
                                color: 'white'
                            }}
                            name="to"
                            disabled={loading}
                            onChange={changeHandler}
                            value={form.to}
                        />
                        <label for="to">To</label>
                    </div>
                    <div className="input-field col s3">
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
                            disabled={loading}
                            onChange={changeHandler}
                            value={form.date}
                        />
                        <label htmlFor="date">When</label>
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
                            onClick={createRequest}
                            type="submit"
                            name="action"
                        >
                            search
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}