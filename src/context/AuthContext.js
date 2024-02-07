import { createContext, useContext, useEffect, useState } from 'react';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from 'firebase/auth';
import { auth } from '../config.js';
import Axios from 'axios';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [userType, setUserType] = useState(null);
    const [token , setToken] = useState("");
    const [error, setError] = useState("");

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };
    
    const signIn = (email, password) =>  {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logout = () => {
        return signOut(auth)
    }
    
    /* GET TYPE OF USER */
    const getUserDetails = async (user, uid, token) => {
        const response = await Axios.get(`http://localhost:8000/login?user=${encodeURIComponent(user)}&uid=${uid}`, {
            headers: {token}
        });

        if (response.data) {
            setUserType(response.data.message);
            setError("");
        } else {
            setUserType({});
            setError("Error user details");
        };
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            // setUser(currentUser);

            // currentUser.getIdToken().then(function(idToken) {  // <------ Check this line
            //     getUserDetails(user.email, user.uid, idToken);
            // });

            if (currentUser) {
                setUser(currentUser);

                currentUser.getIdToken().then(function(idToken) {  // <------ Check this line
                    getUserDetails(currentUser.email, currentUser.uid, idToken);
                });

            } else {
                setUser(null);
            }
        });
        
        return () => {
            unsubscribe();
        };

    }, []);

    
    return (
        <UserContext.Provider value={{ createUser, logout, signIn, user }}>
            {children}
        </UserContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(UserContext);
};