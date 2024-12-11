import React from "react";
import { useNavigate } from "react-router-dom";

function ReadPage({ error, data }) {
    const headers = [
        "_id",
        "Nombre",
        "Email",
        "Edad",
        "Direccion",
        "isActive",
        "Actualizar",
        "Eliminar"
    ];

    const navigate = useNavigate();

    const toCapitalize = (str) => {
        if (!str) return str;
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    return (
        <div className="Read container">
            {error ? (
                <p className="Read-error">{error}</p>
            ) : (
                <div className="Read-intro">
                    {data.length > 0 ? (
                        <table className="table table-dark">
                            <thead>
                                <tr>
                                    {headers.map((header, index) => {
                                        if (header === 'Direccion') {
                                            return (
                                                <th className="col" colSpan={4} key={index}>Direccion</th>
                                            );
                                        }
                                        return <th className="col" key={index}>{header}</th>;
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => (
                                    <tr key={item._id}>
                                        {headers.map((header, colIndex) => {
                                            const value = item[header];

                                            if (header === 'Direccion' && value && typeof value === 'object') {
                                                const addressLines = Object.entries(value)
                                                    .map(([key, val], addressIndex) => (
                                                        <div key={`${item._id}-address-${addressIndex}`}>{`${toCapitalize(key)}: ${val}`}</div>
                                                    ));

                                                return (
                                                    <td key={`${item._id}-address`} colSpan={4}>
                                                        {addressLines}
                                                    </td>
                                                );
                                            }

                                            if (header === 'Nombre' || header === 'Email') {
                                                return <td key={`${item._id}-${colIndex}`}>{toCapitalize(value)}</td>;
                                            }

                                            if (header === 'isActive') {
                                                return <td key={`${item._id}-${colIndex}`}>{value ? 'Sí' : 'No'}</td>;
                                            }

                                            if (header === 'Actualizar') {
                                                return (

                                                    <td key={`update-${item._id}`}>
                                                        <button
                                                            className="btn btn-warning me-2"
                                                            onClick={() => navigate(`/update/${item._id}`)}
                                                        >
                                                            Actualizar
                                                        </button>
                                                    </td>

                                                );
                                            }
                                            if (header === 'Eliminar') {
                                                return (

                                                    <td key={`delete-${item._id}`}>
                                                        <button
                                                            className="btn btn-danger"
                                                            onClick={() => navigate(`/delete/${item._id}`)}
                                                        >
                                                            Eliminar
                                                        </button>
                                                    </td>
                                                );
                                            }


                                            return <td key={`${item._id}-${colIndex}`}>{value}</td>;
                                        })}
                                    </tr>
                                ))}
                            </tbody>

                        </table>

                    ) : (
                        <p>No data available</p>
                    )}
                    <button className="btn btn-outline-success w-100 btn-lg" onClick={() => navigate('/create')} >Crear usuario</button>
                </div>
            )}
        </div>
    );
}

export default ReadPage;
