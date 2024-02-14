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
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
    
                const idToken = await currentUser.getIdToken();

                try {
                    const response = await Axios.get(
                        `http://localhost:8000/login`,
                        {
                            params: {
                                user: currentUser.email,
                                uid: currentUser.uid
                            },
                            headers: {
                                token: idToken
                            }
                        }
                    );
        
                    if (response.data.message) {
                        setUserType(response.data.message.type);
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
    }, []);

    
    return (
        <UserContext.Provider value={{ createUser, logout, signIn, user, userType }}>
            {children}
        </UserContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(UserContext);
};