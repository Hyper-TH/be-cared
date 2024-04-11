import React from "react";
import '../styles/home.css';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext.js';


// TODO: Remove all console logs
const HomePage = () => {
    const { user, userType, logout } = UserAuth();
	const navigate = useNavigate();
    
	const handleLogout = async () => {
		try {
			await logout();
			navigate('/');
			
			console.log(`Logged Out`)
		} catch (e) {
			console.log(e.message);
		}
	};

    const content = (() => {
        // If user is verified
        if (user && user.email  && (userType === 'verified')) {
            return (
                <>
                <h2 className="sub_title">{`Signed In as ${user.email}`}</h2>

                <Link to="/subscriptions" className="btn_collection_top">
                    See Subscriptions
                </Link>

                <Link to="/search" className="btn_collection_mid">
                    Search Medicines
                </Link>

                <Link to="/foodInteractions" className="btn_collection_mid">
                    Discover Food Interactions
                </Link>

                            
                <Link to="/searchDrugs" className="btn_collection_mid">
                    Discover Drug Interactions
                </Link>

                <Link to="/searchProduct" className="btn_collection_bottom">
                    Search Merck Products
                </Link>


                </>
            );
        } 
        // If user is standard
        else {
            return (
                <>
                <h2 className="sub_title">{`Signed In as ${user.email}`}</h2>

                <Link to="/subscriptions" className="btn_collection_top">
                    See Subscriptions
                </Link>

                <Link to="/search" className="btn_collection_mid">
                    Search Medicines
                </Link>

                <Link to="/foodInteractions" className="btn_collection_mid">
                   Discover Food Interactions
                </Link>

                            
                <Link to="/searchDrugs" className="btn_collection_bottom">
                    Discover Drug Interactions
                </Link>

                </>
            );
        }
    })();
 
    return (
        <section className="main_container">
            <div className="sub_container">
            <h1 className="main_title">
                Welcome to beCared
            </h1>

            <div className="home_container">
                <div className="home">

                    <div className="btn_collection">
                        {content}  

                    </div>   

                    <button className="btn_primary" onClick={handleLogout}>Logout</button>

                </div>
            </div>
            </div>
        </section>
    );
};

export default HomePage;