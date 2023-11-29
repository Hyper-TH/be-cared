import { Link, useParams } from 'react-router-dom';


export const HTMLRenderPage = ({subPageName, backTo }) => {
    const { parsedSPC } = useParams();

    console.log(parsedSPC);
    return (
        <>
            <h1>HTML Renders here!</h1>
            {/* <iframe
                srcDoc={`${doc}`}
                title="Embedded HTML"
                width="100%"
                height="400"
                >
            </iframe> */}
            <button>
                <Link to={backTo}>Back to the Medicine Page</Link>
            </button>
        </>
    )
};


