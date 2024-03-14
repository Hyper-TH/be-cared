import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react'; 
import Axios from 'axios';

const PDFRenderPage = () => {
    const [PDFURL, setPDFURL] = useState("");
    const [PDFName, setPDFName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    let location = useLocation();

    const { medicine, type, path } = location.state || {}; // Destructuring with a fallback to an empty object
    
    useEffect(() => {   
        const getDocument = async () => {
            setIsLoading(true);
            setError("");

            if (type === 'PIL') { 
                let response;
                
                if (path) {
                    try {
                        response = await Axios.get(
                            `${process.env.REACT_APP_LOCALHOST}/grabCache`,
                            { params: { uploadPath: path }});
                        
                        if (response.data) {
                            const blob = new Blob([new Uint8Array(response.data.doc.data)], { type: 'application/pdf' });
                            const blob_url = URL.createObjectURL(blob);
    
                            setPDFURL(blob_url);
                            setPDFName(`${medicine.medicineName}_pil.pdf`);
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
                        response = await Axios.get(
                            `${process.env.REACT_APP_LOCALHOST}/grabCache`,
                            { params: { uploadPath: medicine.pils[0].activePil.file.name }});
                        
                        if (response.data) {
                            const blob = new Blob([new Uint8Array(response.data.doc.data)], { type: 'application/pdf' });
                            const blob_url = URL.createObjectURL(blob);
    
                            setPDFURL(blob_url);
                            setPDFName(`${medicine.name}_pil.pdf`);
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

            } else {
                let response;

                if (path) {
                    try {
                        response = await Axios.get(
                            `${process.env.REACT_APP_LOCALHOST}/grabCache`,
                            { params: { uploadPath: path} });
                    
                        if (response.data) {
                    
                            const blob = new Blob([new Uint8Array(response.data.doc.data)], { type: 'application/pdf' });
                            const blob_url = URL.createObjectURL(blob);
    
                            setPDFURL(blob_url);
                            setPDFName(`${medicine.medicineName}_spc.pdf`);
                            setError("");
                        } else {
                            setPDFURL("");
                            setError("Error retrieving SPC");
                        }
                    } catch (error) {
                        console.error(error);
                    }

                } else {

                    try {
                        response = await Axios.get(
                            `${process.env.REACT_APP_LOCALHOST}/grabCache`,
                            { params: { uploadPath: medicine.activeSPC.file.name} });
                    
                        if (response.data) {
                    
                            const blob = new Blob([new Uint8Array(response.data.doc.data)], { type: 'application/pdf' });
                            const blob_url = URL.createObjectURL(blob);
    
                            setPDFURL(blob_url);
                            setPDFName(`${medicine.name}_spc.pdf`);
                            setError("");
                        } else {
                            setPDFURL("");
                            setError("Error retrieving SPC");
                        }
                    } catch (error) {
                        console.error(error);
                    }
                }
            }

            setIsLoading(false);
        };

        // Fetch document only when the component mounts
        getDocument();
    }, [type]);

    const navigate = useNavigate();

    // Function to navigate back with a fallback if coming from a default page
    const returnToMed = () => {
        if (path) {
            navigate('/subscriptions');
        } else {
            navigate(`/result/${encodeURIComponent(medicine.name)}`, { state: { medicine, type }});
        }
    };

    return (    
        <>
            <h1>PDF Renderer Page</h1>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <>
                <iframe
                        src={PDFURL}
                        title="PDF"
                        width="100%"
                        height="400" 
                />
                <a href={PDFURL} download={PDFName}>
                    <button>Download PDF</button>
                </a>
                </>
            )}


            <button onClick={() => returnToMed(medicine)}>
                Return
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </>
    );
};

export default PDFRenderPage;