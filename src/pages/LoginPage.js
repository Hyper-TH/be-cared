import { useState,useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

export const LoginPage = () => {
    // const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [response, setResponse] = useState("");

    const login = async (e) => {
        e.preventDefault(); // Prevents default form submission behaviour (refreshing)

        try {
            const res = await Axios.get(`http://localhost:8000/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);

            if (res.data.uid) {
                // TODO: not setting
                setResponse(res.data.uid);
    
                console.log(response);
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

