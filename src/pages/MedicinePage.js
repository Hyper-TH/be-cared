import { Link, useParams, useNavigate } from 'react-router-dom';

export const MedicinePage = ({ subPageName, backTo }) => {
    const { medicineName, parsedSPC, company, activeIngredient } = useParams();

    const navigate = useNavigate();

    const renderHTML = (medicineName, parsedSPC, company, activeIngredient) => {
        console.log(parsedSPC);
        
        navigate({
            pathname: `/render/${encodeURIComponent(medicineName)}/${encodeURIComponent(parsedSPC)}/${encodeURIComponent(company)}/${activeIngredient}`
        });
    };

    return (
        <>
            <h1>{medicineName}</h1>
            <p>Company: {company}</p>
            <p>Active Ingredient: {activeIngredient}</p>

            <button onClick={() => renderHTML(medicineName, parsedSPC, company, activeIngredient)}>
                View SPC Document
            </button>
            <button>
                <Link to={backTo}>Back to the Search Page</Link>
            </button>
        </>
    );
};
