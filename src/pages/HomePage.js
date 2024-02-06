import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react'; 
import { auth } from '../config/config.js';
import Axios from 'axios';

// TODO: If there is no current login, redirect to login page
export const HomePage = () => {
    const navigate = useNavigate();
    const [authUser, setAuthUser] = useState(null);
    const [userDetails, setUserDetails] = useState({});
    const [error, setError] = useState("");
    
    /* CALL SERVER */
    const getUserDetails = async (user, uid, token) => {
        const response = await Axios.get(`http://localhost:8000/login?user=${encodeURIComponent(user)}&token=${token}&uid=${uid}`);

        if (response.data) {
            setUserDetails(response.data.message);
            setError("");
        } else {
            setUserDetails({});
            setError("Error user details");
        };
    };

    // useEffect to listen for changes in authentication state
    useEffect(() => {

        // Function to listen for changes in authentication state
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);

                user.getIdToken().then(function(idToken) {  // <------ Check this line
                    getUserDetails(user.email, user.uid, idToken);
                });

            } else {
                setAuthUser(null);
            }
        });
    
        // Cleanup function to remove the listener when the component unmounts
        return () => {
            listen();
        };

    }, []); // The empty dependency array ensures that this effect runs once when the component mounts

    const userSignOut = () => {
        signOut(auth) 
        .then(() => {
            console.log("Sign out successful");
            navigate('/loggedOut');
            
        })
        .catch((error) => console.log(error));
    };

    return (
        <div className="App">
            <div>
            <h2>Home Page</h2>
            <div>
                <p>Choose an option:</p>
                <button>
                    <Link to="/search">Search Medicine</Link>
                </button>

                {authUser ? (
                <>
                    <p>{`Signed In as ${authUser.email}`}</p>
                    <button>
                        <Link to="/subscriptions">Subscriptions</Link>
                    </button>

                    <div>    
                        {userDetails.type === 'verified' && (
                            <button>
                                <Link to="/merck">Search chemical compound</Link>
                            </button>
                        )}
                    </div>

                    <button onClick={userSignOut}>Sign out</button>
                </>
                ) : ( <p>Signed Out</p> )}
            </div>
            </div>
        </div>
    );
};