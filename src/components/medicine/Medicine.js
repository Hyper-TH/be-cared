export const Medicine = (props) => {
    const hasPil = props.medicine.pil.doc;
    const hasSpc = props.medicine.spc.doc;

    const pilButton = hasPil ? (
        <button onClick={() => props.renderPIL(props.medicine)}>
            View PIL Document
        </button>
    ) : (
        <button disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>
            No available PIL Document
        </button>
    );

    const spcButton = hasSpc ? (
        <button onClick={() => props.renderSPC(props.medicine)}>
            View SPC Document
        </button>
    ) : (
        <button disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>
            No available SPC Document
        </button>
    );

    return (
        <div className="medicine">
            <h2>{props.medicine.name}</h2>

            {pilButton}
            {spcButton}

            <button onClick={() => props.unsubscribe(props.medicine)}>
                Unsubscribe to this medicine
            </button>            
        </div>
    );
};
