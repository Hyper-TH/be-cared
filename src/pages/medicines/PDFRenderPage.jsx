import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react'; 
import { UserAuth } from '../../context/AuthContext.js';
import '../../styles/medicinePages/pdf_render.css';
import Axios from 'axios';
import { PDFComponent } from '../../components/medicine/PDFComponent.js';

const PDFRenderPage = () => {
    const { user } =  UserAuth();
    const [PDFURL, setPDFURL] = useState("");
    const [PDFName, setPDFName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    let location = useLocation();

    const { medicine, id, path, type } = location.state || {}; // Destructuring with a fallback to an empty object
    
    useEffect(() => {   
        console.log(user.email);

        const getDocument = async () => {
            setIsLoading(true);
            setError("");

            console.log(user);

            if (type === 'pil') { 
                let response;
                
                if (path) {
                    try {
                        response = await Axios.get(
                            `${process.env.REACT_APP_LOCALHOST}/grabCache`,
                            { params: { uploadPath: path }});
                        
                        if (response.data) {
                            const blob = new Blob([new Uint8Array(response.data.doc.data)], { type: 'application/pdf' });
                            console.log(blob);

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
                        setError("Document unfetchable, please refer to medicines.ie for the document");    
                    }

                    try {
                        console.log(`Calling /updateUser now`);
                        const response = await Axios.get(
                            `${process.env.REACT_APP_LOCALHOST}/updateUser`,
                            { params: {user: user.email, id: id, type: type }}
                        );

                        console.log(response);
                    } catch (error) {
                        console.error("Axios error: ", error);
                    }

                } else {
                    try {
                        response = await Axios.get(
                            `${process.env.REACT_APP_LOCALHOST}/grabCache`,
                            { params: { uploadPath: medicine.pils[0].activePil.file.name }}
                        );
                        
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
                        setError("Document unfetchable, please refer to medicines.ie for the document");                    }
                    
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

                    try {
                        console.log(`Calling /updateUser now`);
                        const response = await Axios.get(
                            `${process.env.REACT_APP_LOCALHOST}/updateUser`,
                            { params: {user: user.email, id: id, type: type }}
                        );

                        console.log(response);

                    } catch (error) {
                        console.error("Axios error: ", error);
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
    }, [medicine, id, path, type, user]);

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
        <section className='main_container'>

            <div className='sub_container_pdf'>

                {isLoading ? (
                    <div className='sub_container_header'>
                        <button className='btn_return' onClick={() => returnToMed(medicine)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                            </svg>
                        </button>

                        <div className='loading'>Loading...</div>
                    </div>

                ): PDFURL ? (
                    <>
                    <div className='sub_container_header'>
                        <button className='btn_return' onClick={() => returnToMed(medicine)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                            </svg>
                        </button>

                        <h1 className='main_title'>{type.toUpperCase()} Document</h1>
                    </div>

                    <PDFComponent PDFURL={PDFURL} />

                    <a href={PDFURL} download={PDFName}>
                        <button className='btn_primary'>Download PDF</button>
                    </a>
                    </>
                ) : ( 
                    <>
                        <div className='sub_container_header'>
                            <button className='btn_return' onClick={() => returnToMed(medicine)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                                </svg>
                            </button>

                        <div className='error'>
                        <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                        </svg>

                            <div>
                                <span className='font-medium'>{error}</span>
                            </div>
                        </div>
                        </div>

                    </>
                )}
            </div>
    
        </section>
        
        </>
    );
};

export default PDFRenderPage;