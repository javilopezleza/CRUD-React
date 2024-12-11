import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import DeletePage from "../pages/DeletePage.js";

function Delete() {
    const { id } = useParams(); // Obtiene el id desde la URL
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();

    // Obtener los datos del usuario cuando el componente se monta
    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetch(`http://localhost:3001/api/data/${id}`);
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                } else {
                    setError("No se encontró el usuario");
                }
            } catch (err) {
                setError("Error al obtener los datos del usuario");
            }
        }

        if (id) {
            fetchUser();
        }
    }, [id]);

    const handleDelete = async () => {
        // Usar SweetAlert2 para confirmar la eliminación
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: `¿Seguro que deseas eliminar al usuario ${user?.Nombre}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
        });

        if (result.isConfirmed) {
            setIsDeleting(true);
            try {
                const response = await fetch(`http://localhost:3001/api/data/${id}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    // Mostrar SweetAlert2 con mensaje de éxito
                    Swal.fire(
                        'Eliminado!',
                        'El usuario ha sido eliminado correctamente.',
                        'success'
                    );
                    navigate("/read"); // Redirigir a la página principal después de eliminar
                } else {
                    throw new Error("Error al eliminar el usuario");
                }
            } catch (err) {
                // Mostrar SweetAlert2 con mensaje de error
                Swal.fire(
                    'Error',
                    'Hubo un error al eliminar el usuario.',
                    'error'
                );
                console.error(err);
            } finally {
                setIsDeleting(false);
            }
        }
    };

    // Mostrar los datos del usuario antes de eliminar
    if (error) {
        return <p>{error}</p>;
    }

    if (!user) {
        return <p>Cargando...</p>;
    }

    return (
        <DeletePage
            user={user}
            handleDelete={handleDelete}
            isDeleting={isDeleting}
            />
    );
}

export default Delete;
