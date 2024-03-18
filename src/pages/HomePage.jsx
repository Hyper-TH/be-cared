import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext.js';

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
        if (user && user.email  && (userType === 'verified')) {
            return (
                <>
                <h2 className="sub_title">{`Signed In as ${user.email}`}</h2>

                <button className="btn_collection_top">
                    <Link to="/subscriptions">Subscriptions</Link>
                </button>

                <button className="btn_collection_mid">
                    <Link to="/search">Search Medicine</Link>
                </button>

                <button className="btn_collection_mid">
                            <Link to="/foodInteractions">Search food interactions</Link>
                </button>

                <button className="btn_collection_mid">
                    <Link to="/searchProduct">Search chemical compound</Link>
                </button>
                            
                <button className="btn_collection_bottom">
                    <Link to="/searchDrugs">Search drug interactions</Link>
                </button>

                <button className="btn_primary" onClick={handleLogout}>Logout</button>

                </>
            );
        } else if (user && user.email && (userType !== 'verified')) {
            return (
                <>
                <h2 className="sub_title">{`Signed In as ${user.email}`}</h2>

                <button className="btn_collection_top">
                    <Link to="/subscriptions">Subscriptions</Link>
                </button>

                <button className="btn_collection_mid">
                    <Link to="/search">Search Medicine</Link>
                </button>

                <button className="btn_collection_bottom">
                            <Link to="/foodInteractions">Search food interactions</Link>
                </button>

                <button className="btn_primary" onClick={handleLogout}>Logout</button>

                </>
            );
        } else {
            return (
                <>
                <div className="main_title">
                    Loading...
                </div>
                </>
            );
        }
    })();
 
    // TODO: Make it so that it renders everything at once!
    return (
        <section className="main_container">
            <div className="sub_container">
            <h1 className="home_title">
                Welcome to beCared
            </h1>

            <div className="home_container">
                <div className="home">

                    <div className="btn_collection">
                        {content}  

                    </div>   


                </div>
            </div>
            </div>
        </section>
    );
};

export default HomePage;