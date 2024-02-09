import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';

const GuestMedicinePage = ({subPageName, backTo}) => {
    const { medicineName, pil, company, activeIngredient } = useParams();

    const navigate = useNavigate();

    const renderPIL = (medicineName, pil, company, activeIngredient) => {

        navigate({
            pathname: `guest/render/${encodeURIComponent(medicineName)}/${encodeURIComponent(pil)}/${encodeURIComponent(company)}/${activeIngredient}`
        });
    };

    return (
        <>
            <h1>{medicineName}</h1>
            <div>
                <p>Company: {company}</p>
                <p>Active Ingredient: {activeIngredient}</p>
            </div>

            <button onClick={() => renderPIL(medicineName, pil, company, activeIngredient)}>
                View PIL Document
            </button>

            <button>
                <Link to={backTo}>Back to the Search Page</Link>
            </button>
        </>
    );
};

export default GuestMedicinePage;