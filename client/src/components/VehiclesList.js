import React from 'react';

export const VehiclesList = ({ vehicles }) => {
    return (
        <table>
            <tbody>
                {vehicles.map((vehicle) => {
                    return (
                        <tr key={vehicle._id}>
                            <td> <i className="material-icons prefix" style={{ fontSize: '22px', marginRight: '20px' }}>directions_car</i> <span className="vehicleItem"> {vehicle.mark} {vehicle.model} </span> </td>
                            <td> <span className="vehicleItem"> {vehicle.registrationPlate} </span>  </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
