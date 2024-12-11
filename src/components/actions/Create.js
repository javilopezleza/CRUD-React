import React, { useState } from "react";
import Swal from 'sweetalert2';
import CreatePage from "../../pages/CreatePage.js";
import { useNavigate } from "react-router-dom";


function Create() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Nombre: '',
    Email: '',
    Edad: '',
    Calle: '',
    Ciudad: '',
    Estado: '',
    CodigoPostal: '',
    isActive: false,
    roles: ['user'],
    createdAt: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newData = {
      ...formData,
      Direccion: {
        Calle: formData.Calle,
        Ciudad: formData.Ciudad,
        Estado: formData.Estado,
        CodigoPostal: formData.CodigoPostal
      },
    };

    delete newData.Calle;
    delete newData.Ciudad;
    delete newData.Estado;
    delete newData.CodigoPostal;

    try {
      const response = await fetch('http://localhost:3001/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });

      if (response.ok) {
        const data = await response.json();
        Swal.fire({
          title: "Éxito!",
          text: `El usuario ${data.data.Nombre} se ha añadido con éxito`,
          icon: "success"
        });
        navigate("/read");
      } else {
        console.error("Error creando datos:", response.status);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algo ha ido mal",
          footer: '<a href="#">¿Por qué he tenido este error?</a>'
        });
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  return (
    <CreatePage
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}

export default Create;
