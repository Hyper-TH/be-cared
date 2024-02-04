import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../config/config.js'

export const CurrentUsers = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        // Cleanup the listener when the component unmounts
        return () => unsubscribe();
    }, []);

    return (
        <div>
            {user ? (
                <>
                    <p>{`Signed In as ${user.email}`}</p>
                    {/* Additional user information can be accessed through the 'user' object */}
                </>
            ) : (
                <p>Not signed in</p>
            )}
        </div>
    );
}

