import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { UserAuth } from '../../context/AuthContext.js';
import Axios from 'axios';

const MedicinePage = ({ backTo }) => {
    const { user } = UserAuth();
    const [subscription, setSubscription] = useState(null);

    let location = useLocation();
    let state = location.state;
    let medicine = state.medicine;
    
    const navigate = useNavigate();

    const renderSPC = (medicine) => {
        const type = "SPC";

        navigate(`/render/${encodeURIComponent(medicine.name)}/${encodeURIComponent(type)}`, { state: { medicine, type }});
    };

    const renderPIL = (medicine) => {
        const type = "PIL";
        
        navigate(`/render/${encodeURIComponent(medicine.name)}/${encodeURIComponent(type)}`, { state: { medicine, type }});
    };

    const subscribe = async (medicine) => {
        const response = await Axios.get(
            `${process.env.REACT_APP_LOCALHOST}/subscribe`,
            {
                params: {
                    user: user.email,
                    name: encodeURIComponent(medicine.name),
                    activeIngredient: encodeURIComponent(medicine.ingredients[0].name),
                    company: encodeURIComponent(medicine.company.name),
                    pil: encodeURIComponent(medicine.pils[0].activePil.file.name),
                    spc: encodeURIComponent(medicine.activeSPC.file.name)
                }
            }
        );

        console.log(response.data.medicines);
        // If successful, make the button unclickable
    };

    // Useffect if user is already subscribed to this medicine, make the button unclickable

    return (
        <>
            {/* TODO: Get medicine images and whether its market status */}
            <h1>{medicine.name}</h1>
            <div>
                <p>Company: {medicine.company.name}</p>
                <p>Active Ingredient: {medicine.ingredients[0].name}</p>
            </div>
            <button onClick={() => renderSPC(medicine)}>
                View SPC Document
            </button>

            <button onClick={() => renderPIL(medicine)}>
                View PIL Document
            </button>

            <button onClick={() => subscribe(medicine)}>
                Subscribe
            </button>

            <button>
                <Link to={backTo}>Back to the Search Page</Link>
            </button>
        </>
    );
};

export default MedicinePage;