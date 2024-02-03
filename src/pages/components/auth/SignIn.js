import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

export const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] =  useState("");
    const [response, setResponse] = useState("");

    const signIn = async (e) => {
        e.preventDefault();

        try {
            const res = await Axios.get(`http://localhost:8000/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);

            if (res.data.uid) {
                setResponse(res.data.uid);
    
                console.log(response);

                navigate({
                    pathname: 
                    `/home`,
        
                });
            } else {
                console.log("Incorrect login details");
            }

        } catch (error) {
            console.error(error);
        }      
    };

    useEffect(() => {
        console.log(response);
    }, [response]);

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

