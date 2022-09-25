import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import background from "../images/film-drayv-drive.jpg";

export const AuthPage = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const message = useMessage();
    const { loading, request, error, clearError } = useHttp();
    const [form, setForm] = useState({
        email: '', password: '', firstName: '', lastName: '', tel: '', date: ''
    })

    useEffect(() => {
        message(error);
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form })
            auth.login(data.token, data.userId)
            navigate(`/search`);
        } catch (error) { }
    }

    return (
        <>
            <div className="box" style={{
                position: 'absolute',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
                backgroundRepeat: 'no-repeat',
                backgroundImage: `url(${background})`
            }} />
            <div className="row"
                style={{
                    display: 'flex',
                    justifyContent: 'right',
                    marginTop: '40%',
                    marginLeft: '10%'
                }}>
                <div className="col s6 offset-s3">
                    <div className="row">
                        <div className="col s12 m6">
                            <div className="card black"
                                style={{
                                    borderRadius: '5px',
                                    width: '600px',
                                    boxShadow: '10px 5px 5px black'
                                }}>

                                <div className="card-content white-text">
                                    <span className="card-title" style={{
                                        fontSize: '30px',
                                        textAlign: 'center',
                                        textShadow: '1px 2px 1px black'
                                    }}>
                                        Authorization</span>
                                    <div>

                                        <div className="input-field">
                                            <i className="material-icons prefix">email</i>
                                            <input
                                                id="icon_prefix"
                                                type="email"
                                                name="email"
                                                className="validate"
                                                style={{ fontSize: '20px', color: 'white' }}
                                                onChange={changeHandler}
                                                disabled={loading}
                                                value={form.email} />
                                            <label for="icon_prefix">Email</label>
                                        </div>

                                        <div className="input-field">
                                            <i className="material-icons prefix">vpn_key</i>
                                            <input
                                                id="icon_prefix"
                                                type="password"
                                                name="password"
                                                className="validate"
                                                style={{ fontSize: '20px', color: 'white' }}
                                                onChange={changeHandler}
                                                disabled={loading}
                                                value={form.password} />
                                            <label for="icon_prefix">Password</label>
                                        </div>

                                    </div>

                                    <div style={{ marginBottom: '15px' }}>
                                        <button
                                            className="btn waves-effect waves-light" style={{
                                                backgroundColor: '#ffb300',
                                                width: '100%',
                                                fontSize: '16px',
                                                textShadow: '1px 1px 2px black'
                                            }}
                                            onClick={loginHandler}
                                            type="submit"
                                            name="action"
                                        >
                                            SIGN IN
                                        </button>
                                    </div>

                                    <div>
                                        <NavLink to="/register">
                                            <button
                                                className="btn waves-effect waves-light" style={{
                                                    backgroundColor: '#757575',
                                                    width: '100%',
                                                    fontSize: '16px',
                                                    textShadow: '1px 1px 2px black'
                                                }}
                                            >
                                                SIGN UP
                                            </button>
                                        </NavLink>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}