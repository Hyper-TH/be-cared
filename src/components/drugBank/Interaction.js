export const Interaction = (props) => {
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

            <p>
                {/* References: {
                    // props.references.map((reference) => {
                    //     <li key={reference}>
                    //         <p>{reference}</p>
                    //     </li>
                    // })
                    props.references
                } */}
            </p>
        </div>
    );
};