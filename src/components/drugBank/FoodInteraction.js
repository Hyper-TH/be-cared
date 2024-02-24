export const FoodInteraction = (props) => {

    const listItems = Object.entries(props.interactions).map(([key, value]) => (
        <li key={key}>{value}</li>
    ));

    // TODO: Render properly for 0 interactions
    return (
        <div className="food_interaction">
            <div>
                Drug name: {props.name}
                has {props.num_interactions}
            </div>

            <div>
                Interactions: <ul>{listItems}</ul>
            </div>
        </div>
    );
};
