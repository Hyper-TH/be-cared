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
            <h1>{subPageName} Page</h1>
            <p>Medicine Name: {medicineName}</p>
            <p>Company: {company}</p>
            <p>Active Ingredient: {activeIngredient}</p>
            <p>Parsed SPC: {parsedSPC}</p>

            <button onClick={() => renderHTML(medicineName, parsedSPC, company, activeIngredient)}>
                View document
            </button>
            <button>
                <Link to={backTo}>Back to the Search Page</Link>
            </button>
        </>
    );
};
