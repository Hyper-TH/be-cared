import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { UserAuth } from '../../context/AuthContext.js';
import Axios from 'axios';

const MedicinePage = ({ backTo }) => {
    const { user } = UserAuth();
    const [subscription, setSubscription] = useState(false);

    let location = useLocation();
    let state = location.state;
    let medicine = state.medicine;
    
    const navigate = useNavigate();

    const renderSPC = (medicine) => {
        const type = "SPC";

        navigate(
            `/render/${encodeURIComponent(medicine.name)}/${encodeURIComponent(type)}`, 
            { state: { medicine, type } }
        );
    };

    const renderPIL = (medicine) => {
        const type = "PIL";
        
        navigate(
            `/render/${encodeURIComponent(medicine.name)}/${encodeURIComponent(type)}`, 
            { state: { medicine, type } }
        );
    };

    const cacheMed = async (medicine) => {
        await Axios.get(
            `${process.env.REACT_APP_LOCALHOST}/cacheMed`,
            {
                params: {
                    id: medicine.id,
                    name: medicine.name,
                    activeIngredient: medicine.ingredients[0].name,
                    company: medicine.company.name,
                    status: medicine.legalCategory,
                    pil: medicine.pils[0].activePil.file.name,
                    spc: medicine.activeSPC.file.name
                }
            }
        );
    };

    const subscribe = async (medicine) => {
        const response = await Axios.get(
            `${process.env.REACT_APP_LOCALHOST}/subscribe`,
            {
                params: {
                    user: user.email,
                    id: encodeURIComponent(medicine.id),
                    name: encodeURIComponent(medicine.name),
                    pil: encodeURIComponent(medicine.pils[0].activePil.file.name),
                    spc: encodeURIComponent(medicine.activeSPC.file.name)
                }
            }
        );

        console.log(response.data.medicines);

        // After subscribing, re-check the subscription status
        await checkSub(medicine);
    };

    const checkSub = async (medicine) => {
        try {
            const response = await Axios.get(
                `${process.env.REACT_APP_LOCALHOST}/checkSub`,
                {
                    params: {
                        user: user.email,
                        name: encodeURIComponent(medicine.name),
                    }
                }           
            );

            if (response.data.exists === true) {
                console.log(`Medicine subbed`);
                setSubscription(true);
            } else {
                console.log(`Medicine not subbed`);
                setSubscription(false);
            }

        } catch (error) {
            console.error(`Axios Error: ${error}`);
        }
    };

    // Styles for the button
    const buttonStyle = {
        opacity: subscription ? 0.5 : 1, // Make button transparent when subscription is true
        cursor: subscription ? 'not-allowed' : 'pointer', // Change cursor style
    };

   
    // useEffect should call checkSub with the correct medicine and user parameter
    useEffect(() => {
        // Only call checkSub if the medicine and user.email are defined
        if (medicine && user && user.email) {
            checkSub(medicine);
        }
    }, [medicine, user]); // Depend on both `medicine` and `user` so that checkSub runs again if either changes
    
    return (
        <>
            <h1>{medicine.name}</h1>
            <div>
                <p>Company: {medicine.company.name}</p>
                <p>Active Ingredient: {medicine.ingredients[0].name}</p>
                <p>Status: {medicine.legalCategory}</p>
            </div>
            <button onClick={() => renderSPC(medicine)}>
                View SPC Document
            </button>

            <button onClick={() => renderPIL(medicine)}>
                View PIL Document
            </button>

            <button 
                style={buttonStyle}
                disabled={subscription}
                onClick={() => subscribe(medicine)}>
                Subscribe
            </button>

            <button>
                <Link to={backTo}>Back to the Search Page</Link>
            </button>
        </>
    );
};

export default MedicinePage;