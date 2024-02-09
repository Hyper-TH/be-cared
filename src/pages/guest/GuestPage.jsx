import React from "react";
import { Link, useNavigate } from 'react-router-dom';

const GuestPage = () => {
	const navigate = useNavigate();
    
	const handleLogout = () => {
        navigate('/');
        
        console.log(`Logged Out`);
	}
 
    return (
        <div className="App">
            <div>
            <h2>Home Page</h2>
            <div>
                <p>Choose an option:</p>
                <button>
                    <Link to="/guest/search">Search Medicine</Link>
                </button>

                <button onClick={handleLogout}>Logout</button>
            </div>
            </div>
        </div>
    );
};

export default GuestPage;