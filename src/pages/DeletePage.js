import React from "react";


function DeletePage({user, handleDelete, isDeleting}) {
    return(
        <div>
        <h2 className="container">Eliminar usuario</h2>
        <div className="d-flex justify-content-center align-items-center vh-50 mt-5">
            <div className="delete-container text-center">
                <h3>Eliminar Usuario: {user.Nombre}</h3>
                <div className="user-details">
                    <p><strong>Nombre:</strong> {user.Nombre}</p>
                    <p><strong>Email:</strong> {user.Email}</p>
                    <p><strong>Edad:</strong> {user.Edad}</p>
                    <p><strong>Dirección:</strong> {user.Direccion?.Calle}, {user.Direccion?.Ciudad}, {user.Direccion?.Estado}</p>
                    <p><strong>Código Postal:</strong> {user.Direccion?.CodigoPostal}</p>
                </div>

                <button
                    className="btn btn-danger"
                    onClick={handleDelete}
                    disabled={isDeleting}
                >
                    {isDeleting ? "Eliminando..." : "Eliminar Usuario"}
                </button>
            </div>
        </div>
    </div>
    )
}

export default DeletePage;