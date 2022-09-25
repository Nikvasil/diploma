import { useHttp } from '../hooks/http.hook'
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from '../context/AuthContext'
import { Loader } from '../components/Loader'
import { ProfileCard } from '../components/ProfileCard';
import { useParams } from 'react-router-dom';

export const ProfilePage = () => {
    const params = useParams();
    const { token, userId } = useContext(AuthContext)
    const { request, loading } = useHttp()
    const [user, setUser] = useState(null)

    const getUser = useCallback(async () => {
        try {
            const fetched = await request(`/api/user/${params.id}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setUser(fetched)
        } catch (e) { }
    }, [token, userId, request])

    useEffect(() => {
        getUser()
    }, [getUser])

    if (loading) {
        return <Loader />
    }

    return (
        <>
            {!loading && user && <ProfileCard user={user} />}
        </>
    )
}