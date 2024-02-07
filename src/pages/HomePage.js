import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext.js';

export const HomePage = () => {
    const { user, logout } = UserAuth();
	const navigate = useNavigate();
    
	const handleLogout = async () => {
		try {
			await logout();
			navigate('/');
			
			console.log(`Logged Out`)
		} catch (e) {
			console.log(e.message);
		}
	}
 
    return (
        <div className="App">
            <div>
            <h2>Home Page</h2>
            <div>
                <p>Choose an option:</p>
                <button>
                    <Link to="/search">Search Medicine</Link>
                </button>

                {user && user.email ? (
                <>
                    <p>{`Signed In as ${user.email}`}</p>
                    <button>
                        <Link to="/subscriptions">Subscriptions</Link>
                    </button>

                    {/* <div>    
                        {userDetails.type === 'verified' && (
                            <button>
                                <Link to="/merck">Search chemical compound</Link>
                            </button>
                        )}
                    </div> */}

                    <button onClick={handleLogout}>Logout</button>
                </>
                ) : ( <p>Signed Out</p> )}
            </div>
            </div>
        </div>
    );
};