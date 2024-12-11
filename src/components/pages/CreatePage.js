import React from "react";

function CreatePage({ formData, handleChange, handleSubmit }) {
    return (
        <div className="Create container w-100 d-flex flex-column align-items-center">
            <h2 className="Create-header text-center">
                Crear nuevo usuario
            </h2>

            <form className="row w-100 justify-content-center" onSubmit={handleSubmit}>
                {/* Section 1: 3 inputs */}
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

                {/* Section 2: 4 inputs */}
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

                {/* Submit button */}
                <div className="col-lg-8 text-center">
                    <button className="btn btn-outline-success btn-lg w-100" type="submit">
                        Crear Usuario
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreatePage;
