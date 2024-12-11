import React, { useEffect, useState } from "react";
import ReadPage from "../pages/ReadPage.js";

function Read() {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch('http://localhost:3001/api/data')
            .then(response => {
              
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
              
                setData(data);
            })
            .catch(err => {
                console.error('Error in fetch:', err); 
                setError(`Error: ${err.message}`);  
            });
    }, []);

    return (
        <div>
            <h2 className="container">Todos los usuarios</h2>
            <ReadPage error={error} data={data} />
        </div>
    );
}

export default Read;
