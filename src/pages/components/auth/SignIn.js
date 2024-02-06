import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../config/config.js';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] =  useState("");

    const signIn = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            
            if (userCredential.user) {
                console.log(userCredential);
                navigate('/');
            } else {
                console.log("Incorrect login details");
            }
        } catch (error) {
            console.error(error);
        }      
    };

    return (
        <div className="signInContainer">
            <form onSubmit={signIn}>
                <h1>Log In</h1>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Login</button>
            </form>

        </div>
    )
}

