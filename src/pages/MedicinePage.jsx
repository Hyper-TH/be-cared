import { Link, useParams, useNavigate } from 'react-router-dom';

const MedicinePage = ({ subPageName, backTo }) => {
    const { medicineName, parsedSPC, pil, company, activeIngredient } = useParams();

    const navigate = useNavigate();

    const renderHTML = (medicineName, parsedSPC, pil, company, activeIngredient) => {
        console.log(parsedSPC);
        
        navigate({
            pathname: `/render/${encodeURIComponent(medicineName)}/${encodeURIComponent(parsedSPC)}/${encodeURIComponent(pil)}/${encodeURIComponent(company)}/${activeIngredient}`
        });
    };

    const renderPIL = (medicineName, parsedSPC, pil, company, activeIngredient) => {
        console.log(parsedSPC);
        
        navigate({
            pathname: `/pil/${encodeURIComponent(medicineName)}/${encodeURIComponent(parsedSPC)}/${encodeURIComponent(pil)}/${encodeURIComponent(company)}/${activeIngredient}`
        });
    };

    return (
        <>
            <h1>{medicineName}</h1>
            <div>
                <p>Company: {company}</p>
                <p>Active Ingredient: {activeIngredient}</p>
            </div>
            <button onClick={() => renderHTML(medicineName, parsedSPC, pil, company, activeIngredient)}>
                View SPC Document
            </button>

            <button onClick={() => renderPIL(medicineName, parsedSPC, pil, company, activeIngredient)}>
                View PIL Document
            </button>

            <button>
                <Link to={backTo}>Back to the Search Page</Link>
            </button>
        </>
    );
};

export default MedicinePage;