import React from "react"
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Read from '../../components/actions/Read.js';
import Create from '../../components/actions/Create.js';
import Home from "../pages/Home.js";
import Update from "../actions/Update.js";
import Delete from "../actions/Delete.js";

function Navbar() {
    return (
        <Router>

            {/* Navigation */}
            <nav className="navbar navbar-expand-lg bg-body-primary">
                <div className="container-fluid">
                    <a className="navbar-brand link-light" href="/index">CRUD_App_React</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link link-light active" to="/index">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link link-light" to="/read">Ver usuarios</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Routes */}

            <Routes>
                <Route path="/" element={<Home />} />  
                <Route path="/index" element={<Home />} />            
                <Route path="/read" element={<Read />} />
                <Route path="/create" element={<Create />} />
                <Route path="/update/:id" element={<Update />} />
                <Route path="/delete/:id" element={<Delete />} />

            </Routes>
        </Router>
    )
}

export default Navbar;

