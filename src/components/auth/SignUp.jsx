import { useState } from 'react'
// import { createUserWithEmailAndPassword } from 'firebase/auth';
import { createUser } from '../../context/AuthContext.js';
import { auth } from '../../config.js';
import Axios from 'axios';

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signUp = async (e) => {
        e.preventDefault();
        
        try {
            const type = "standard";
            const userCredential = await createUser(auth, email, password, type);

            if (userCredential) {
                console.log(`Successful login!`);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="sign-in=container">
            <form onSubmit={signUp}>
                <h1>Create Account</h1>

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

                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
};

export default SignUp;
// TODO: When a user signs up, users database is updated with an empty medicine field (if possible)

