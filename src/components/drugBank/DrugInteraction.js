import  '../../styles/drugbankPages/drug_interactions.css';

export const DrugInteraction = (props) => {
    
    // Map the object to an array of JSX elements
    const listItems = Object.entries(props.references).map(([key, value]) => (
        <li key={key}>{value}</li>
    ));

    const severity =(() => {
        
        if (props.severity === 'Major') {
            return (
                <button className='btn_major'>
                    Major
                </button>
            );
        } else if (props.severity === 'Moderate') {
            return (
                <button className='btn_moderate'>
                    Moderate
                </button>
            );
        } else {
            return (
                <button className='btn_minor'>
                    Minor
                </button>
            );
        }

    })();

    return (
        <div className="interaction">
            <div>
                {props.subject} against {props.affected}
                
                has a severity of:  {severity}
            </div>

            <div className='brief_description'>
                Brief description: {props.description}
            </div>

            <div className='longer_description'>
                Longer description: {props.actual_description}
            </div>

            <div>
                References: <ul>{listItems}</ul>;
            </div>
            
        </div>
    );
};