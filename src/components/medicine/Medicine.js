export const Medicine = (props) => {
    const hasPil = props.medicine.pil.available;
    const hasSpc = props.medicine.spc.available;
    // const pilUpdate = props.medicine.pil.notifications;
    // const spcUpdate = props.medicine.spc.notifications;

    console.log(props.medicine.activeIngredients);

    const spcButton = hasSpc ? (
        <button 
            className="btn_collection_med_left"
            onClick={() => props.renderSPC(props.medicine)}>
            View SPC Document
        </button>
    ) : (
        <button 
            disabled 
            classname='btn_collection_med_left'
            style={{ opacity: 0.5, cursor: 'not-allowed' }}>
            No available SPC Document
        </button>
    );

    const pilButton = hasPil ? (
        <button 
            className='btn_collection_med_mid' 
            onClick={() => props.renderPIL(props.medicine)}>
            View PIL Document
        </button>
    ) : (
        <button 
            disabled 
            className="btn_collection_med_mid"
            style={{ opacity: 0.5, cursor: 'not-allowed' }}>
            No available PIL Document
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
                    Unsubscribe to this medicine
                </button>   

            </div>
        </div>
    );
};
