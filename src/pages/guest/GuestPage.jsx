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
                <h2 className="main_title">
                    Welcome to beCared
                </h2>
            
                <div className="home_container">
                    <div className="home">
                        <div className="btn_collection">

                            <button className="btn_collection_top_disabled" disabled>
                                See Subscriptions &#40;login&#41; required
                            </button> 

                            <Link to="/guest/search" className="btn_collection_mid">
                                Search Medicines
                            </Link>
                            
                            <button className="btn_collection_mid_disabled" disabled>
                                Discover Food Interactions &#40;login&#41; required
                            </button>
                            
                            <button className="btn_collection_bottom_disabled" disabled>
                                Discover Drug Interactions &#40;login&#41; required
                            </button>
                        
                        </div>

                        <button  className="btn_primary" onClick={handleLogout}>Return to login</button>

                    </div>
                </div> 
            </div>
        </div>
    );
};

export default GuestPage;