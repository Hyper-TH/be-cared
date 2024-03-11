export const Medicine = (props) => {
    const hasPil = props.medicine.pil;
    const hasSpc = props.medicine.spc;

    const pilButton = hasPil ? (
        <button onClick={() => props.viewPil(props.medicine.pils[0].activePil.file.name)}>
            View PIL Document
        </button>
    ) : (
        <button disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>
            No available PIL Document
        </button>
    );

    const spcButton = hasSpc ? (
        <button onClick={() => props.viewSpc(props.medicine.activeSPC.file.name)}>
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
