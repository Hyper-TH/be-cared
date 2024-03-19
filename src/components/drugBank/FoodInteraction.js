export const FoodInteraction = (props) => {
    const listItems = Object.entries(props.interactions).map(([key, value]) => {
        return <li key={key}>{value}</li>;
    });

    return (
        <div className="interactions_box">
          <div className="interaction_row">
            {(props.num_interactions).includes("0") ? (
                <>
                <div className="main">
                    0 food interactions for
                    <h1>{props.name}</h1>  
                </div>

                <div className="sub">
                    No known food interactions
                </div>
                </>
            ) : (
                <>
                <div className="main">
                    {props.num_interactions} for
                    <h1>{props.name}</h1>
                </div>

                <div className="sub">
                    Interactions: <ol>{listItems}</ol>
                </div>
                </>
            )}
            </div>          
        </div>

        );
};
