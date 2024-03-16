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
 
    // TODO: Make it so that it renders everything at once!
    return (
        <div className="home_page">
            <div className="title">
                <h2>Home Page</h2>
            </div>
            
            <div className="home_buttons">
                <p>Choose an option:</p>

                <button>
                    <Link to="/search">Search Medicine</Link>
                </button>

                {user && user.email ? (
                <>
                    <div className="standard_buttons">
                        <p>{`Signed In as ${user.email}`}</p>

                        <button>
                            <Link to="/subscriptions">Subscriptions</Link>
                        </button>

                        <button>
                                    <Link to="/foodInteractions">Search food interactions</Link>
                        </button>

                        <div className="verified_pages">    
                        {userType === 'verified' && (
                            <>
                            <button>
                                <Link to="/searchProduct">Search chemical compound</Link>
                            </button>
                            
                            <button>
                                <Link to="/searchDrugs">Search drug interactions</Link>
                            </button>
                            </>
                        )}

                        </div>
                    </div>

                    <button onClick={handleLogout}>Logout</button>
                </>
                ) : ( <p>Signed Out</p> )}
            </div>
        </div>
    );
};

export default HomePage;