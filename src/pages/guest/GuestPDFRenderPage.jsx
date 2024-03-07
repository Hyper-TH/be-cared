import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react'; 
import Axios from 'axios';

const GuestPDFRenderPage = () => {
    const [PDFURL, setPDFURL] = useState("");
    const [error, setError] = useState("");

    let location = useLocation();
    let state = location.state;
    let medicine = state.medicine;

    useEffect(() => {
        const getDocument = async () => {         
            try {
                const response = await Axios.get(`http://localhost:8000/grabCache?uploadPath=${encodeURIComponent(medicine.pils[0].activePil.file.name)}`);

                if (response.data) {
                    const blob = new Blob([new Uint8Array(response.data.doc.data)], { type: 'application/pdf' });
                    const blob_url = URL.createObjectURL(blob);

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
    }, []);

    const navigate = useNavigate();

    const returnToMed = (medicine) => {
        navigate(`/guest/result/${encodeURIComponent(medicine.name)}`, { state: { medicine }});
    };

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

            <button onClick={() => returnToMed(medicine)}>
                Return
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </>
    );
};

export default GuestPDFRenderPage;