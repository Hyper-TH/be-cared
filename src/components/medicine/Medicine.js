export const Medicine = (props) => {
    const hasPil = props.medicine.pil.available;
    const hasSpc = props.medicine.spc.available;
    const pilUpdate = props.medicine.pil.notifications;
    const spcUpdate = props.medicine.spc.notifications;

    console.log(spcUpdate);

    const spcButton = hasSpc  && spcUpdate ? (
        <button 
            className="btn_collection_med_left inline-flex items-center px-5 py-2.5"
            onClick={() => props.renderSPC(props.medicine)}>
            SPC Document

            <span className="new_document">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                </svg>
            </span>

        </button>
        
    ) : hasSpc ? (
        <button 
            className="btn_collection_med_left"
            onClick={() => props.renderSPC(props.medicine)}>
            SPC Document
        </button>
    ) : (
        <button 
            disabled 
            classname='btn_collection_med_left'
            style={{ opacity: 0.5, cursor: 'not-allowed' }}>
            SPC Document Unavailable
        </button>
    );

    const pilButton = hasPil && pilUpdate? (
        <button 
            className='btn_collection_med_mid inline-flex items-center px-5 py-2.5' 
            onClick={() => props.renderPIL(props.medicine)}>
            PIL Document

            <span className="new_document">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                </svg>
            </span>
            
        </button>
    ) : hasPil ? (
        <button 
            className='btn_collection_med_mid' 
            onClick={() => props.renderPIL(props.medicine)}>
            PIL Document
        </button>
    ) : (
        <button 
            disabled 
            className="btn_collection_med_mid"
            style={{ opacity: 0.5, cursor: 'not-allowed' }}>
            PIL Document Unavailable
        </button>
    );

    return (
        <div className="sub_medicine">
            <h2 className="medicine_name">{props.medicine.medicineName}</h2>
            
            <div className='medicine_sub_details'>
                <ul className='max-w-md space-y-1 text-gray-300 list-disc list-inside'>
                    {props.medicine.activeIngredients.map((ingredient, index) => (
                        <li key={index}>
                            <span className='medicine_text'>{ingredient}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="btn_collection_medicine">
                {spcButton}
                {pilButton}

                <button 
                    className="btn_collection_med_right"
                    onClick={() => props.unsubscribe(props.medicine)}>
                    Unsubscribe
                </button>   

            </div>
        </div>
    );
};
