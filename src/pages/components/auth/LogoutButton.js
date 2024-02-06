import { getAuth, signOut } from 'firebase/auth';
import { auth } from '../../../config/config.js';
import { useNavigate } from 'react-router-dom';

export const LogoutButton = () => {
    const navigate = useNavigate();
    
    const logOut = async () => {

        signOut(auth) 
        .then(() => {
            console.log("Sign out successful");
            navigate('/loggedOut');
            
        })
        .catch((error) => console.log(error));
    }

    return (
        <button onClick={logOut}>Log out</button>
    )
}