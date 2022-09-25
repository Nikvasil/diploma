import React, { useContext, useEffect } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';

export const CancelButton = (tripId) => {
    const navigate = useNavigate();
    const { request, error, clearError } = useHttp();
    const message = useMessage();
    const auth = useContext(AuthContext);

    const removeTrip = async () => {
        try {
            const data = await request('/api/trip/remove_trip', 'POST', { tripId }, {
                Authorization: `Bearer ${auth.token}`
            })
            message(data.message);
            navigate(`/createdtrips/${auth.userId}`);
        } catch (e) { }
    }

    useEffect(() => {
        message(error);
        clearError()
    }, [error, message, clearError])

    return (
        <>
            <div>
                <button
                    className="btn waves-effect waves-light" style={{
                        backgroundColor: '#212121',
                        width: '600px',
                        marginTop: '24px',
                        fontSize: '16px',
                        textShadow: '1px 1px 2px black'
                    }}
                    onClick={removeTrip}
                    type="submit"
                    name="action"
                >
                    cancel
                </button>
            </div>
        </>
    )
}