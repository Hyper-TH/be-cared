import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'; 
import Axios from 'axios';

export const HTMLRenderPage = ({subPageName, backTo }) => {
    const [document, setDocument] = useState("");
    const [error, setError] = useState("");

    const { parsedSPC } = useParams();

    useEffect(() => {
        const getDocument = async () => {
          try {
            const response = await Axios.get(`http://localhost:8000/getSPC?uploadPath=${encodeURIComponent(parsedSPC)}`);
    
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

    console.log(parsedSPC);
    return (
        <>
            <h1>HTML Renders here!</h1>
            <iframe
                srcDoc={`${document}`}
                title="Embedded HTML"
                width="100%"
                height="400"
                >
            </iframe>
            <button>
                {/* TODO: Need to redirect to the same medicine, otherwise 404 */}
                <Link to={backTo}>Back to the Medicine Page</Link>
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </>
    )
};

