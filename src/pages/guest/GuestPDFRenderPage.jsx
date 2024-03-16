import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react'; 
import Axios from 'axios';

const GuestPDFRenderPage = () => {
    const [PDFURL, setPDFURL] = useState("");
    const [PDFName, setPDFName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    let location = useLocation();
    let state = location.state;
    let medicine = state.medicine;

    useEffect(() => {
        const getDocument = async () => {       
            setIsLoading(true);
            setError("");

            try {
                const response = await Axios.get(
                    `${process.env.REACT_APP_LOCALHOST}/grabCache`,
                        { params: { uploadPath: medicine.pils[0].activePil.file.name } });

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

            setIsLoading(false);
        };

        // Fetch document only when the component mounts
        getDocument();
    }, []);

    const navigate = useNavigate();

    const returnToMed = (medicine) => {
        navigate(
            `/guest/result/${encodeURIComponent(medicine.name)}`, 
            { state: { medicine } }
        );
    };

    return (    
        <>
        <div className='pdf_render'>
            <div className='title'>
                <h1>PDF Renderer Page</h1>

            </div>

            <div className='pdf'>
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
            </div>

            <button onClick={() => returnToMed(medicine)}>
                Return
            </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
        </div>

        </>
    );
};

export default GuestPDFRenderPage;