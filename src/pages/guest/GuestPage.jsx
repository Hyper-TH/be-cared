import React from "react";
import '../../styles/home.css';
import { Link, useNavigate } from 'react-router-dom';

const GuestPage = () => {
	const navigate = useNavigate();
    
	const handleLogout = () => {
        navigate('/');
        
        console.log(`Logged Out`);
	}
 
    return (
        <div className="main_container">
            <div className="sub_container">
                <h2 className="home_title">
                    Welcome to beCared
                </h2>
            
                <div className="home_container">
                    <div className="home">
                        <div className="btn_collection">
                            
                            <Link to="/guest/search" className="btn_collection_top">
                                Search Medicine
                            </Link>

                            {/* TODO: Display the other button options and indicate login required */}
                            <Link to="/" className="btn_collection_mid">
                                Search food interactions
                            </Link>
                            <Link to="/" className="btn_collection_bottom">
                                Search drug interactions
                            </Link>

                            <button  className="btn_primary" onClick={handleLogout}>Return to login</button>
                        
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    );
};

export default GuestPage;