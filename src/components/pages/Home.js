import React from "react";
import { useNavigate } from "react-router-dom";


function Home() {

    const navigate = useNavigate();

    return(
        <div  className="container">

        <h1 className="fs-2">Welcome to CRUD-App</h1>
        <p className="fs-5">On this page you will find a simple CRUD app where you can create, read, update and delete information about users located in a DB.</p>
        <p> Ir a <button className="btn btn-outline-primary" onClick={() => navigate('/read')} > Ver usuarios </button> </p>
        </div>
    );
}

export default Home;