import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/config.js';

export const AuthDetails = () => {
    const navigate = useNavigate();
    const [authUser, setAuthUser] = useState(null);

    // useEffect to listen for changes in authentication state
    useEffect(() => {

        // Function to listen for changes in authentication state
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
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
        <>
        <div>
            {authUser ? (
            <>
                <p>{`Signed In as ${authUser.email}`}</p>
                <button onClick={userSignOut}>Sign out</button>
            </>
            ) : (
                <p>Signed Out</p>
            )}
        </div>
        </>
    )
};