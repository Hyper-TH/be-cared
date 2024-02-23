export const Interaction = (props) => {
    
    // Map the object to an array of JSX elements
    const listItems = Object.entries(props.references).map(([key, value]) => (
        <li key={key}>{value}</li>
    ));

    return (
        <div className="interaction">
            <div>
                {props.subject} against {props.affected}
                
                has a severity of:  {props.severity}
            </div>

            <div>
                Brief description: {props.description}
                Longer description: {props.actual_description}
            </div>

            <div>
                References: <ul>{listItems}</ul>;
            </div>
            
        </div>
    );
};