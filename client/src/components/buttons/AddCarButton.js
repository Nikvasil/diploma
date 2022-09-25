import React from "react";
import { NavLink } from 'react-router-dom';

export const AddCarButton = () => {
    return (
        <>
            <li className="addVehicle">
                <NavLink to="/profile/create_vehicle">
                    <i className="material-icons prefix" style={{ fontSize: '20px', marginRight: '10px' }}>add_circle_outline</i>
                    <span style={{ color: '#ffb300', fontSize: '24px' }}> Add a car </span>
                </NavLink>
            </li>
        </>
    )
}