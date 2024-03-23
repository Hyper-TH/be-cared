import React from 'react';
import DOMPurify from 'dompurify';
import  '../../styles/drugbankPages/drug_interactions.css';
import { useDescTruncatedElement } from '../hooks/useDescTruncatedElement';
import { useRefTruncatedElement } from '../hooks/useRefTruncatedElement';

export const DrugInteraction = (props) => {
    const ref = React.useRef(null);
    const { isDescTruncated, isDescShowingMore, toggleDescIsShowingMore } = useDescTruncatedElement({ref});
    const { isRefTruncated, isRefShowingMore, toggleRefIsShowingMore } = useRefTruncatedElement({ref});

    // Function to wrap numbers with <sub> tags
    const wrapWithSub = (match) => {
        // Removing the leading period from the match before wrapping
        const numberWithoutPeriod = match.substring(1);
        return `<sup>${numberWithoutPeriod}</sup>`;
    };
    
    // Regex to find patterns like '.7,6' including the period before the number and comma separated numbers after it
    const pattern = /\.\d+(,\d+)*/g;
    
    // Replace the matched patterns in the input string with the modified string that wraps numbers with <sub> tags
    const outputString = (props.actual_description).replace(pattern, wrapWithSub);

    // Sanitize
    const clean = DOMPurify.sanitize(outputString);

    console.log(clean);

    const extendedDescription = (() => {

        // If less
        if (isDescTruncated) {
            return (
                <>
                <div className='justify-center'>
                <p dangerouslySetInnerHTML={{ __html: clean }} ref={ref} className={`description ${!isDescShowingMore && 'line-clamp-3'}`}>
                </p>   
                {isDescTruncated && (
                    <button className='truncate_btn' onClick={toggleDescIsShowingMore}>
                        {isDescShowingMore ? 'Show less' : 'Show more'}
                    </button>
                )} 
                </div>
                </>
            );
        } else {
            return (
                <>
                <div className='justify_center'>
                <p dangerouslySetInnerHTML={{ __html: clean }} ref={ref} className={`references ${!isDescShowingMore && 'line-clamp-3'}`}>
                </p>   
                {isDescTruncated && (
                    <button className='truncate_btn' onClick={toggleDescIsShowingMore}>
                        {isDescShowingMore ? 'Show less' : 'Show more'}
                    </button>
                )} 
                </div>
                </>
            );
        }
    })();

    const extendedReferences = (() => {
        if (isRefTruncated) {
            return ( 
            <>
            <div className='justify_center'>
            <ol className={`references ${!isRefShowingMore && 'line-clamp-3'}`} ref={ref}>
                {(props.references).map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ol>
                {isRefTruncated && (
                    <button className='truncate_btn' onClick={toggleRefIsShowingMore}>
                        {isRefShowingMore ? 'Show less' : 'Show more'}
                    </button>
                )}
            </div> 
            </>
            );
        } else {
            return (
                <>
                <div className='justify_center'>
                <ol className={`references  ${!isRefShowingMore && 'line-clamp-3'}`} ref={ref} >
                    {(props.references).map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ol>
                    {isRefTruncated && (
                        <button className='truncate_btn' onClick={toggleRefIsShowingMore}>
                            {isRefShowingMore ? 'Show less' : 'Show more'}
                        </button>
                    )} 
                    </div>
                </>
            );
        }
    })();

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

            <div className='interactions_row'>
                
                <div className='small_screen disable_small_screen:contents'>
                    <div className='interactions_col subject'>
                        {props.subject}
                    </div>

                    <div className='interactions_col interacts'>
                        <div className='interacts_icon'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                            </svg>
                        </div> 
                    </div>

                    <div className='interactions_col affected'>
                        {props.affected}
                    </div>
                </div>
                    
                <div className='interactions_col severity'>
                    {severity}
                </div>

            </div>


            <div className='interactions_row'>
                <div className='interactions_col label_col'>
                    Description
                </div>

                <div className='interactions_col'>
                    {props.description}
                </div>
            </div>

            <div className='interactions_row'>
                <div className='interactions_col label_col'>
                    Extended Description
                </div>

                <div className='interactions_col'>
                        {extendedDescription}
                </div>
            </div>
            
            <div className='interactions_row'>
                <div className='interactions_col label_col'>
                    References
                </div>

                <div className='interactions_col'>
                    {extendedReferences}
                 
                </div>
            </div>
            
        </div>
    );
};