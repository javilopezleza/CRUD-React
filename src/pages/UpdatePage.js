import React from "react";


function UpdatePage({handleChange, formData, handleSubmit, setFormData}) {
    return(
        <div className="Update container w-100 d-flex flex-column align-items-center">
        <h2 className="Update-header text-center">Actualizar Usuario: {formData.Nombre}</h2>

        <form className="row w-100 justify-content-center" onSubmit={handleSubmit}>
            {/* Sección 1: Datos básicos */}
            <div className="section1 col-lg-8 mb-4">
                <div className="row">
                    <div className="col-md-4">
                        <label className="form-label">
                            Nombre:
                            <input
                                type="text"
                                name="Nombre"
                                value={formData.Nombre}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Nombre"
                            />
                        </label>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">
                            Email:
                            <input
                                type="text"
                                name="Email"
                                value={formData.Email}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Email"
                            />
                        </label>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">
                            Edad:
                            <input
                                type="text"
                                name="Edad"
                                value={formData.Edad}
                                onChange={(e) => {
                                    if (/^\d*$/.test(e.target.value) && e.target.value.length <= 3) {
                                        handleChange(e);
                                    }
                                }}
                                className="form-control"
                                placeholder="Edad"
                                maxLength={3}
                            />
                        </label>
                    </div>
                </div>
            </div>

            {/* Sección 2: Dirección */}
            <div className="section2 col-lg-8 mb-4">
                <div className="row">
                    <div className="col-md-3">
                        <label className="form-label">
                            Calle:
                            <input
                                type="text"
                                name="Calle"
                                value={formData.Calle}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Calle"
                            />
                        </label>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">
                            Ciudad:
                            <input
                                type="text"
                                name="Ciudad"
                                value={formData.Ciudad}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Ciudad"
                            />
                        </label>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">
                            Estado:
                            <input
                                type="text"
                                name="Estado"
                                value={formData.Estado}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Estado"
                            />
                        </label>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">
                            Código Postal:
                            <input
                                type="text"
                                name="CodigoPostal"
                                value={formData.CodigoPostal}
                                onChange={(e) => {
                                    if (/^\d*$/.test(e.target.value) && e.target.value.length <= 10) {
                                        handleChange(e);
                                    }
                                }}
                                className="form-control"
                                placeholder="Código Postal"
                                maxLength={10}
                            />
                        </label>
                    </div>
                </div>
            </div>

            {/* Sección 3: Roles y estado */}
            <div className="section3 col-lg-8 mb-4">
                <div className="row">
                    {/* <div className="col-md-6">
                        <label className="form-label">
                            Roles:
                            <input
                                type="text"
                                name="roles"
                                value={formData.roles.join(", ")}
                                onChange={handleRolesChange}
                                className="form-control"
                                placeholder="Roles"
                            />
                        </label>
                    </div> */}
                    <div className="col-md-6">
                        <label className="form-label d-flex align-items-center mt-4">
                            Activo:
                            <input
                                type="checkbox"
                                name="isActive"
                                checked={formData.isActive}
                                onChange={(e) =>
                                    setFormData({ ...formData, isActive: e.target.checked })
                                }
                                className="form-check-input ms-2"
                            />
                        </label>
                    </div>
                </div>
            </div>

            {/* Botón de enviar */}
            <div className="col-lg-8 text-center">
                <button className="btn btn-outline-primary btn-lg w-100" type="submit">
                    Actualizar Usuario
                </button>
            </div>
        </form>
    </div>
    )
}


export default UpdatePage;