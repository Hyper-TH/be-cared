import { useState } from 'react';
import { auth, GoogleProvider } from '../config/config.js';
import { createUserWithEmailAndPassword, 
        signInWithEmailAndPassword, 
        signInWithPopup, 
        signOut 
    } from 'firebase/auth';

export const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = (e) => {
        e.preventDefault();

        console.log("Called login");

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
            })
            .catch((error) => {
                console.log(error);
            });
        console.log("Called login");
    };

    return (
        <div className="sign-in-container">
            <form onSubmit={login}>
                <h1>Log In to your Account</h1>
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
                
                <button type="submit">Log In</button>
            </form>

        </div>
    );
};

