import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react'; 
import '../../styles/medicinePages/pdf_render.css'
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
    }, [medicine.name, medicine.pils]);

    const navigate = useNavigate();

    const returnToMed = (medicine) => {
        navigate(
            `/guest/result/${encodeURIComponent(medicine.name)}`, 
            { state: { medicine } }
        );
    };

    return (    
        <>
        <section className='main_container'>
            <button className='btn_primary' onClick={() => returnToMed(medicine)}>
                Return
            </button>
        <div className='sub_container_pdf'>

            {isLoading ? (
                <div className='loading'>Loading...</div>
            ) : (
                <>
                <h1 className='home_title'>PIL Document</h1>
                
                <iframe
                    className='pdf'
                    src={PDFURL}
                    title="PDF"
                    allowFullScreen
                />
                <a href={PDFURL} download={PDFName}>
                    <button className='btn_primary'>Download PDF</button>
                </a>
                </>
            )}

        </div>

            {error && 
                <div className='error'>
                <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>

                    <div>
                        <span className='font-medium'>{error}</span>
                    </div>
                </div>
            }

        
        </section>

        </>
    );
};

export default GuestPDFRenderPage;