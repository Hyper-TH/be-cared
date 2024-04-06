import { createContext, useContext, useEffect, useState } from 'react';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from 'firebase/auth';
import { auth } from '../config';
import Axios from 'axios';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [userType, setUserType] = useState("");
    const [type, setType] = useState("");   // For adding new users
    // const [token , setToken] = useState("");
    const [error, setError] = useState("");

    const createUser = async (email, password, type) => {
        setType(type);

        // When successful, this automatically calls /login
        const userCredential = createUserWithEmailAndPassword(auth, email, password);
        
        return userCredential;
    };
    
    const signIn = (email, password) =>  {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logout = () => {
        return signOut(auth)
    }
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
    
                const idToken = await currentUser.getIdToken();

                try {
                    // Get type of user from login endpoint (i.e., standard or verified)
                    const response = await Axios.get(
                        `${process.env.REACT_APP_LOCALHOST}/login`,
                        {
                            params: {
                                user: currentUser.email,
                                uid: currentUser.uid,
                                type: type
                            },
                            headers: {
                                token: idToken
                            }
                        }
                    );
        
                    if (response.data.message) {
                        console.log(`Got response`);

                        setUserType(response.data.message);

                        setError("");
                    } else {
                        setUserType({});
                        setError("Error user details");
                    }
                } catch (error) {
                    console.error("Error fetching user details:", error);
                    setError("Error fetching user details");
                }
            } else {
                setUser(null);
            }
        });
    
        return unsubscribe;
    }, [type]);

    
    return (
        <UserContext.Provider value={{ createUser, logout, signIn, user, userType }}>
            {children}
        </UserContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(UserContext);
};