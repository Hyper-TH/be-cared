export const MedicinePage = ({subPageName, backTo}) => {
    return (
        <>
            <button>
                <Link to={backTo}>Back to the Search Page</Link>
            </button>
        </>
    )
};