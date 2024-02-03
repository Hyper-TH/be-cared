import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react'; 
import { auth } from '../../config/config.js';

export const AuthDetails = () => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        });

        return () => {
            listen();
        };
    }, []);

    const userSignOut = () => {
        signOut(auth) 
        .then(() => {
            console.log("Sign out successful");
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