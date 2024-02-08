import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'; 
// import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import Axios from 'axios';

export const PILRenderPage = ({ subPageName, backTo }) => {
    const [PDFURL, setPDFURL] = useState("");
    const [error, setError] = useState("");

    // URL of uploadPath in FireStore
    const { pil } = useParams();

    useEffect(() => {
        const getDocument = async () => {
            try {
                const response = await Axios.get(`http://localhost:8000/grabCachePIL?pil=${encodeURIComponent(pil)}`);

                if (response.data) {
                    const blob = new Blob([response.data.doc.data], { type: 'application/pdf' });
                    console.log(blob);
					// console.log(response.data);

                    setPDFURL(URL.createObjectURL(blob));
                    setError("");
                } else {
                    setPDFURL("");
                    setError("Error retrieving PIL");
                }

            } catch (error) {
                console.error(`Axios Error: ${error}`);
                setPDFURL("");
                setError("Local Server Error");
            }
        };

        // Fetch document only when the component mounts
        getDocument();
    }, [pil]);

    const navigate = useNavigate();

    const returnToMed = (medicineName, parsedSPC, pil, company, activeIngredient) => {
        navigate({
            pathname: `/result/${encodeURIComponent(medicineName)}/${encodeURIComponent(parsedSPC)}/${encodeURIComponent(pil)}/${encodeURIComponent(company)}/${encodeURIComponent(activeIngredient)}`
        })
    }

    return (
        <>
            <h1>PIL Document</h1>
            <h2>Currently implementing the PDF handling system</h2>
			<iframe
                src={PDFURL}
                title="PDF"
                width="100%"
                height="400"
                >
            </iframe>

            <button onClick={() => returnToMed()}>
                Return
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </>
    );
};

export default PILRenderPage;