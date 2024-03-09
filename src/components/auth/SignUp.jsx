import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config.js';
import Axios from 'axios';

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signUp = async (e) => {
        e.preventDefault();
        
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log(userCredential);
            
            // const type = "standard";
            // Create user instance

            console.log(`Calling axios now...`);
            const response = await Axios.get(
                `${process.env.REACT_APP_LOCALHOST}/signUp`,
                {
                    params: { 
                        user: userCredential.user.email, 
                        // type: type
                    }
                }
            );
    
            console.log(`Finished calling axios...`);


            if (response) {
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

