export const FoodInteraction = (props) => {
    const listItems = Object.entries(props.interactions).map(([key, value]) => {
        return <li key={key}>{value}</li>;
    });

    return (
        <div className="food_interaction">
            {(props.num_interactions).includes("0") ? (
                <>
                <div>
                    Drug name: {props.name} has 0 food interactions
                </div>
                </>
            ) : (
                <>
                <div>
                    Drug name: {props.name}
                    has {props.num_interactions}
                </div>
                <div>
                    Interactions: <ul>{listItems}</ul>
                </div>
                </>
            )}
            </div>
        );
};
