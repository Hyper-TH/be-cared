import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'; 
import Axios from 'axios';

export const HTMLRenderPage = ({subPageName, backTo }) => {
    const [document, setDocument] = useState("");
    const [error, setError] = useState("");

    // URL of uploadPath in FireStore
    const { medicineName, parsedSPC } = useParams();

    useEffect(() => {
        const getDocument = async () => {
          try {
            // const response = await Axios.get(`http://localhost:8000/getSPC?uploadPath=${encodeURIComponent(parsedSPC)}`);
            const response = await Axios.get(`http://localhost:8000/grabCacheSPC?uploadPath=${encodeURIComponent(parsedSPC)}`);
    
            if (response.data) {
              setDocument(response.data);
              setError("");
            } else {
              setDocument("");
              setError("Error retrieving SPC");
            }
    
          } catch (error) {
            console.error(`Axios Error: ${error}`);
            setDocument("");
            setError("Local Server Error");
          }
        };
    
        // Fetch document only when the component mounts
        getDocument();
    }, [parsedSPC]);

	const navigate = useNavigate();

	const returnToMed = (medicineName, parsedSPC) => {
		navigate({
			pathname: `/result/${encodeURIComponent(medicineName)}/${encodeURIComponent(parsedSPC)}`
		})
	}

	console.log(document);

    return (
        <>
            <h1>HTML Renders here!</h1>
            <iframe
                srcDoc={`${document.doc}`}
                title="Embedded HTML"
                width="100%"
                height="400"
                >
            </iframe>
            <button onClick={() => returnToMed(medicineName, parsedSPC)}>
				Back to the Medicine Page
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </>
    )
};


