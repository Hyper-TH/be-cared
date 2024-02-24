import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'; 
import '@react-pdf-viewer/core/lib/styles/index.css';
import Axios from 'axios';

const GuestPDFRenderPage = ({ subPageName, backTo }) => {
    const [PDFURL, setPDFURL] = useState("");
    const [error, setError] = useState("");

    // URL of uploadPath in FireStore
    const { medicineName, pil, company, activeIngredient } = useParams();

    useEffect(() => {
        const getDocument = async () => {         
            try {
                const response = await Axios.get(`http://localhost:8000/grabCache?uploadPath=${encodeURIComponent(pil)}`);

                // console.log("Response:", response.data.doc.data);

                if (response.data) {
                
                    const blob = new Blob([new Uint8Array(response.data.doc.data)], { type: 'application/pdf' });
                    // console.log(blob);
                    const blob_url = URL.createObjectURL(blob);

                    // console.log(blob_url);

                    setPDFURL(blob_url);
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

    const returnToMed = (medicineName, pil, company, activeIngredient) => {
        navigate({
            pathname: `/guest/result/${encodeURIComponent(medicineName)}/${encodeURIComponent(pil)}/${encodeURIComponent(company)}/${encodeURIComponent(activeIngredient)}`
        })
    }

    return (    
        <>
            <h1>PDF Renderer Page</h1>
			<iframe
                src={PDFURL}
                title="PDF"
                width="100%"
                height="400"
                >
            </iframe>

            <button onClick={() => returnToMed(medicineName, pil, company, activeIngredient)}>
                Return
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </>
    );
};

export default GuestPDFRenderPage;