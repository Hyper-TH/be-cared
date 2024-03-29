export const FoodInteraction = (props) => {
    const listItems = Object.entries(props.interactions).map(([key, value]) => {
        return <li key={key}>{value}</li>;
    });

    return (
        <div className="food_interactions_box">
            {(props.num_interactions).includes("0") ? (
                <>
                <div className="main">
                    <strong>0</strong> food interactions for <b>{props.name}</b>  
                </div>

                <div className="sub">
                    <ul className="list-disc list-inside">
                        <li>
                            No known food interactions
                        </li>
                    </ul>
                </div>
                </>
            ) : (
                <>
                <div className="main">
                    <strong>{props.num_interactions}</strong> for <b>{props.name}</b>
                </div>

                <div className="sub">
                    <ol className="list-disc list-inside">
                        {listItems}
                    </ol>
                </div>
                </>
            )}
        </div>

        );
};
