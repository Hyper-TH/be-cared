import { Link, useParams, useNavigate } from 'react-router-dom';

const MedicinePage = ({ subPageName, backTo }) => {
    const { medicineName, spc, pil, company, activeIngredient } = useParams();

    const navigate = useNavigate();

    const renderSPC = (medicineName, spc, pil, company, activeIngredient) => {
        const type = "SPC";

        navigate({
            pathname: `/render/${encodeURIComponent(medicineName)}/${encodeURIComponent(spc)}/${encodeURIComponent(pil)}/${encodeURIComponent(company)}/${activeIngredient}/${type}`
        });
    };

    const renderPIL = (medicineName, spc, pil, company, activeIngredient) => {
        const type = "PIL";

        navigate({
            pathname: `/render/${encodeURIComponent(medicineName)}/${encodeURIComponent(spc)}/${encodeURIComponent(pil)}/${encodeURIComponent(company)}/${activeIngredient}/${type}`
        });
    };

    return (
        <>
            <h1>{medicineName}</h1>
            <div>
                <p>Company: {company}</p>
                <p>Active Ingredient: {activeIngredient}</p>
            </div>
            <button onClick={() => renderSPC(medicineName, spc, pil, company, activeIngredient)}>
                View SPC Document
            </button>

            <button onClick={() => renderPIL(medicineName, spc, pil, company, activeIngredient)}>
                View PIL Document
            </button>

            <button>
                <Link to={backTo}>Back to the Search Page</Link>
            </button>
        </>
    );
};

export default MedicinePage;