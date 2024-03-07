import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react'; 
import Axios from 'axios';

const PDFRenderPage = () => {
    const [PDFURL, setPDFURL] = useState("");
    const [error, setError] = useState("");

    let location = useLocation();
    let state = location.state;
    let medicine = state.medicine;
    let type = state.type;
    
    // TODO: Download the pdf file button!
    useEffect(() => {
        const getDocument = async () => {
            
            if (type === 'PIL') { 
                try {
                    const response = await Axios.get(`${process.env.REACT_APP_LOCALHOST}/grabCache?uploadPath=${encodeURIComponent(medicine.pils[0].activePil.file.name)}`);

                    // console.log("Response:", response.data.doc.data);

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
            } else {
                try {
                    const response = await Axios.get(`http://localhost:8000/grabCache?uploadPath=${encodeURIComponent(medicine.activeSPC.file.name)}`);

                    // console.log("Response:", response.data.doc.data);

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
            }

        };

        // Fetch document only when the component mounts
        getDocument();
    }, [type]);

    const navigate = useNavigate();

    const returnToMed = (medicine) => {
        navigate(`/result/${encodeURIComponent(medicine.name)}`, { state: { medicine }});
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

export default PDFRenderPage;