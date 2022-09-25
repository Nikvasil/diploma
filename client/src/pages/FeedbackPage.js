import React, { useContext, useState, useEffect, useCallback } from "react";
import { useHttp } from "../hooks/http.hook";
import { useNavigate, useParams } from 'react-router-dom';
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../context/AuthContext";
import { Loader } from '../components/Loader';

export const FeedbackPage = () => {
    const params = useParams();
    const tripId = params.id;
    const navigate = useNavigate();
    const message = useMessage();
    const { userId, token } = useContext(AuthContext);
    const [trip, setTrip] = useState(null)
    const { loading, request, error, clearError } = useHttp();
    const [form, setForm] = useState({
        trip: tripId, whom: '', mark: '', feedbackText: ''
    })

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const fetchTrip = useCallback(async () => {
        try {
            const fetched = await request(`/api/trip/${params.id}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setTrip(fetched)
            form.whom = fetched.joiner;
        } catch (e) { }
    }, [token, request])

    useEffect(() => {
        fetchTrip()
    }, [fetchTrip])

    const addFeedback = async () => {
        try {
            console.log(form.feedbackText);
            const data = await request('/api/feedback/add_feedback', 'POST', { ...form }, {
                Authorization: `Bearer ${token}`
            })
            message(data.message);
            navigate(`/createdtrips/${userId}`);
        } catch (e) { }
    }

    useEffect(() => {
        message(error);
        clearError()
    }, [error, message, clearError])

    if (loading || !trip) {
        return <Loader />
    }

    return (
        <>
            <div className="feedbackCard">
                <span> Do you like your fellow traveler ? </span>
                <div>
                    <div className="input-field">
                        <span style={{ marginLeft: '60px', marginRight: '50px' }}>
                            <label>
                                <input
                                    className="with-gap"
                                    name="mark"
                                    type="radio"
                                    onChange={changeHandler}
                                    disabled={loading}
                                    value="true" />
                                <span>Yes</span>
                            </label>
                        </span>
                        <span>
                            <label>
                                <input
                                    className="with-gap"
                                    name="mark"
                                    type="radio"
                                    onChange={changeHandler}
                                    disabled={loading}
                                    value="false" />
                                <span>No</span>
                            </label>
                        </span>

                    </div>
                    <div className="row">
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s12">
                                    <textarea
                                        id="feedbackText"
                                        className="materialize-textarea"
                                        name="feedbackText"
                                        onChange={changeHandler}
                                        disabled={loading}
                                        value={form.feedbackText}
                                        style={{
                                            color: 'white',
                                            width: '400px'
                                        }}></textarea>
                                    <label htmlFor="feedbackText">Why?</label>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div>
                        <button
                            className="btn waves-effect waves-light" style={{
                                backgroundColor: '#ffb300',
                                width: '420px',
                                fontSize: '16px',
                                marginLeft: '10px',
                                textShadow: '1px 1px 2px black'
                            }}
                            onClick={addFeedback}
                            type="submit"
                            name="action"
                        >
                            done
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
} 