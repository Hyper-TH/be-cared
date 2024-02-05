import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react'; 
import { auth } from '../config/config.js';
import Axios from 'axios';

export const HomePage = () => {
    const navigate = useNavigate();
    const [authUser, setAuthUser] = useState(null);
    const [userDetails, setUserDetails] = useState({});
    const [error, setError] = useState("");
    
    /* CALL SERVER */
    const getAuth = async (user) => {
        const response = await Axios.get(`http://localhost:8000/login?user=${encodeURIComponent(user)}`);

        if (response.data) {
            setUserDetails(response.data);
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
                getAuth(user.email);
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
            {authUser ? (
            <>
                <p>{`Signed In as ${authUser.email}`}</p>
                <button onClick={userSignOut}>Sign out</button>
                <p>Choose an option:</p>
    
                <div>
                <button>
                    <Link to="/search">Search Medicine</Link>
                </button>
    
                {authUser.type === 'verified' && (
                    <button>
                        <Link to="/merck">Search chemical compound</Link>
                    </button>
                )}
                </div>
            </>
            ) : (
            <p>Signed Out</p>
            )}
        </div>
        </div>
    </div>
    );
};