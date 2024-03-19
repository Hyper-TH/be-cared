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
        <div className="interactions_box">

            <div className='main_row'>
                
                <div className='subject'>
                    {props.subject}
                </div>

                <div className='interacts'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                    </svg>

                </div>
                
                <div className='affected'>
                    {props.affected}
                </div> 
                
                <div className='severity'>
                    {severity}
                </div>

                <div className='description'>
                    <p>
                        {props.description}
                    </p>
                </div>

            </div>

{/* 
            <div className='longer_description'>
                Longer description: {props.actual_description}
            </div>

            <div>
                References: <ul>{listItems}</ul>;
            </div> */}
            
        </div>
    );
};