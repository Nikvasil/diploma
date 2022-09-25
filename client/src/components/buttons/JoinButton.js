import React, { useContext, useEffect } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';

export const JoinButton = (tripId) => {
    const navigate = useNavigate();
    const { request, error, clearError } = useHttp();
    const message = useMessage();
    const auth = useContext(AuthContext);

    const joinTrip = async () => {
        try {
            const userId = auth.userId;
            const data = await request('/api/trip/join_trip', 'POST', { userId, tripId }, {
                Authorization: `Bearer ${auth.token}`
            })
            message(data.message);
            navigate(`/joinedtrips/${auth.userId}`);
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
                        backgroundColor: '#ffb300',
                        width: '600px',
                        marginTop: '24px',
                        fontSize: '16px',
                        textShadow: '1px 1px 2px black'
                    }}
                    onClick={joinTrip}
                    type="submit"
                    name="action"
                >
                    join
                </button>
            </div>
        </>
    )
}