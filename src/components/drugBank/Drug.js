export const Drug = (props) => {
    return (
        <div className="drug">
            <p>{props.drugName}</p>
            <button onClick={() => props.deleteDrug(props.drugId)}>X</button>
        </div>
    );
};