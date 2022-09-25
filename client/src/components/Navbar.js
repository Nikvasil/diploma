import React, { useContext } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";

export const Navbar = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    const profileHandler = async () => {
        try {
            navigate(`/profile/${auth.userId}`);
        } catch (e) { }
    }

    const tripsHandler = async () => {
        try {
            navigate(`/createdtrips/${auth.userId}`);
        } catch (e) { }
    }

    const logoutHandler = event => {
        event.preventDefault();
        auth.logout();
        navigate('/');
    }

    return (
        <>
            <nav className="amber darken-1">
                <div className="nav-wrapper">

                    <NavLink to="/search" className="brand-logo"
                        style={{
                            marginLeft: '25%',
                            fontSize: '40px',
                            textShadow: '1px 1px 2px black'
                        }}>
                        <span className="material-icons" style={{
                            fontSize: '26px',
                            marginRight: '5px'
                        }}>directions_car</span>drifter</NavLink>

                    <ul className="right hide-on-med-and-down" style={{
                        textShadow: '1px 1px 2px black',
                        marginRight: '25%'
                    }}>

                        <li><NavLink to="/search" style={{ fontSize: '24px' }}>
                            <span className="material-icons" style={{
                                fontSize: '18px',
                                marginRight: '5px'
                            }}>search
                            </span>Search</NavLink></li>

                        <li><NavLink to="/create" style={{ fontSize: '24px' }}>
                            <span className="material-icons" style={{
                                fontSize: '18px',
                                marginRight: '5px'
                            }}>add_circle_outline
                            </span>Create</NavLink></li>

                        <li><a href="" onClick={tripsHandler} style={{ fontSize: '24px' }}>
                            <span className="material-icons" style={{
                                fontSize: '18px',
                                marginRight: '5px'
                            }}>book
                            </span>My trips</a></li>

                        <li><a href="" onClick={profileHandler} style={{ fontSize: '24px' }}>
                            <span className="material-icons" style={{
                                fontSize: '18px',
                                marginRight: '5px'
                            }}>account_circle
                            </span>My profile</a></li>

                        <li><a href="/" onClick={logoutHandler} style={{ fontSize: '24px' }}>
                            <span className="material-icons" style={{
                                fontSize: '18px',
                                marginRight: '5px'
                            }}>exit_to_app
                            </span>Exit</a></li>

                    </ul>
                </div>
            </nav>
        </>
    )
}