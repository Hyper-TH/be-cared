import Axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const ServerTest = ({subPageName, backTo}) => {
    const [message, setMessage] = useState("");
    
    // Using axios
    useEffect(() => {
        Axios.get(`http://localhost:8000/grabCacheSPC`)
        .then((res) => {
            console.log(res.data.testField);
            setMessage(res.data.testField);
        })
    }, []);

    return <>
        <div>
            <h1>{message}</h1>
        </div>
        <div>
            <button>
                <Link to={backTo}>Back to Home</Link>
            </button>
        </div>
    </>
};