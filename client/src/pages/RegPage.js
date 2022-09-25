import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import background from "../images/film-drayv-drive.jpg";

export const RegPage = () => {
    const navigate = useNavigate();
    const message = useMessage();
    const { loading, request, error, clearError } = useHttp();
    const [form, setForm] = useState({
        email: '', password: '', firstName: '', lastName: '', gender: '', tel: '', date: ''
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

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form })
            message(data.message);
            navigate('/');
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
                    marginTop: '30%',
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
                                    <span className="card-title"
                                        style={{
                                            textShadow: '1px 2px 1px black',
                                            fontSize: '30px',
                                            textAlign: 'center'
                                        }}> Registration</span>
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

                                        <div className="input-field">
                                            <i className="material-icons prefix">account_circle</i>
                                            <input
                                                id="icon_prefix"
                                                type="text"
                                                name="firstName"
                                                className="validate"
                                                style={{ fontSize: '20px', color: 'white' }}
                                                onChange={changeHandler}
                                                disabled={loading}
                                                value={form.firstName} />
                                            <label for="icon_prefix">First name</label>
                                        </div>

                                        <div className="input-field">
                                            <i className="material-icons prefix">account_circle</i>
                                            <input
                                                id="icon_prefix"
                                                type="text"
                                                name="lastName"
                                                className="validate"
                                                style={{ fontSize: '20px', color: 'white' }}
                                                onChange={changeHandler}
                                                disabled={loading}
                                                value={form.lastName} />
                                            <label for="icon_prefix">Last name</label>
                                        </div>

                                        <div className="input-field">
                                            <span style={{ marginLeft: '60px', marginRight: '50px' }}>
                                                <label>
                                                    <input
                                                        className="with-gap"
                                                        name="gender"
                                                        type="radio"
                                                        onChange={changeHandler}
                                                        disabled={loading}
                                                        value="male" />
                                                    <span>Male</span>
                                                </label>
                                            </span>
                                            <span>
                                                <label>
                                                    <input
                                                        className="with-gap"
                                                        name="gender"
                                                        type="radio"
                                                        onChange={changeHandler}
                                                        disabled={loading}
                                                        value="female" />
                                                    <span>Female</span>
                                                </label>
                                            </span>

                                        </div>

                                        <div className="input-field">
                                            <i className="material-icons prefix">phone</i>
                                            <input
                                                maxLength={10}
                                                id="icon_prefix"
                                                type="tel"
                                                name="tel"
                                                className="validate"
                                                style={{ fontSize: '20px', color: 'white' }}
                                                onChange={changeHandler}
                                                disabled={loading}
                                                value={form.tel} />
                                            <label for="icon_prefix">Tel.</label>
                                        </div>

                                        <div style={{ color: '#616161', fontSize: '14px' }}>format example: 0662071057</div>

                                        <div className="input-field">
                                            <i className="material-icons prefix">date_range</i>
                                            <input
                                                id="icon_prefix"
                                                type="date"
                                                name="date"
                                                className="validate"
                                                min="1932-01-01"
                                                max="2006-12-31"
                                                style={{ fontSize: '20px', color: 'white', colorScheme: 'dark' }}
                                                onChange={changeHandler}
                                                disabled={loading}
                                                value={form.date} />
                                            <label for="icon_prefix">Birthdate</label>
                                        </div>

                                    </div>

                                    <div style={{ marginBottom: '15px' }}>
                                        <button
                                            className="btn waves-effect waves-light" style={{
                                                backgroundColor: '#ffb300',
                                                marginRight: 10,
                                                width: '100%',
                                                fontSize: '16px',
                                                textShadow: '1px 1px 2px black'
                                            }}
                                            onClick={registerHandler}
                                            type="submit"
                                            name="action"
                                        >
                                            SIGN UP
                                        </button>
                                    </div>

                                    <div>
                                        <NavLink to="/">
                                            <button
                                                className="btn waves-effect waves-light" style={{
                                                    backgroundColor: '#757575',
                                                    marginRight: 10,
                                                    width: '100%',
                                                    fontSize: '16px',
                                                    textShadow: '1px 1px 2px black'
                                                }}
                                            >
                                                Back
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