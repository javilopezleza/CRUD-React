import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UpdatePage from "../pages/UpdatePage.js";

function Update() {
    const { id } = useParams(); // Obtiene el ID del usuario de la URL
    const navigate = useNavigate(); // Para redirigir tras actualizar
    const [formData, setFormData] = useState({
        Nombre: "",
        Email: "",
        Edad: "",
        Calle: "",
        Ciudad: "",
        Estado: "",
        CodigoPostal: "",
        isActive: false,
        roles: ["user"],
        updatedAt: ""
    });
    const [loading, setLoading] = useState(true); // Para mostrar carga mientras se obtienen datos

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetch(`http://localhost:3001/api/data/${id}`);
                if (response.ok) {
                    const userData = await response.json();

                    setFormData({
                        Nombre: userData.Nombre || "",
                        Email: userData.Email || "",
                        Edad: userData.Edad || "",
                        Calle: userData.Direccion?.Calle || "",
                        Ciudad: userData.Direccion?.Ciudad || "",
                        Estado: userData.Direccion?.Estado || "",
                        CodigoPostal: userData.Direccion?.CodigoPostal || "",
                        isActive: userData.isActive || false,
                        roles: userData.roles || ["user"],
                        updatedAt: new Date().toISOString(),
                    });
                    setLoading(false);
                } else {
                    console.error("Error fetching user:", response.status);
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        }

        if (id) {
            fetchUser();
        } else {
            console.error("Id is undefined or null");
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedData = {
            ...formData,
            Direccion: {
                Calle: formData.Calle,
                Ciudad: formData.Ciudad,
                Estado: formData.Estado,
                CodigoPostal: formData.CodigoPostal,
            },
        };

        delete updatedData.Calle;
        delete updatedData.Ciudad;
        delete updatedData.Estado;
        delete updatedData.CodigoPostal;

        try {
            const response = await fetch(`http://localhost:3001/api/data/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                Swal.fire({
                    title: "¡Éxito!",
                    text: "El usuario ha sido actualizado correctamente.",
                    icon: "success",
                });
                navigate("/read"); // Redirige al listado de usuarios
            } else {
                console.error("Error updating user:", response.status);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Algo salió mal al actualizar el usuario.",
                });
            }
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    if (loading) {
        return <p>Cargando datos...</p>;
    }

    return (
        <UpdatePage
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            setFormData={setFormData}
        />
    );
}

export default Update;
