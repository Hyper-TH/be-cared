import React from 'react';
import  '../../styles/drugbankPages/drug_interactions.css';
import { useTruncatedElement } from './useTruncatedElement';

export const DrugInteraction = (props) => {
    const ref = React.useRef(null);
    const { isTruncated, isShowingMore, toggleIsShowingMore } = useTruncatedElement({ref});

    // Map the object to an array of JSX elements
    const listItems = Object.entries(props.references).map(([key, value]) => (
        <li key={key}>{value}</li>
    ));

    const extendedDescription = (() => {

        // If less
        if (isTruncated) {
            return (
                <>
                <p ref={ref} className={`break-words text-xl ${!isShowingMore && 'line-clamp-3'}`}>
                    {props.actual_description}
                </p>   
                {isTruncated && (
                    <button onClick={toggleIsShowingMore}>
                        {isShowingMore ? 'Show less' : 'Show more'}
                    </button>
                )} 
                </>
            );
        } else {
            return (
                <>
                <p ref={ref} className={`break-words text-xl ${!isShowingMore && 'line-clamp-3'}`}>
                    {props.actual_description}
                </p>   
                {isTruncated && (
                    <button onClick={toggleIsShowingMore}>
                        {isShowingMore ? 'Show less' : 'Show more'}
                    </button>
                )} 
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

            <div className='interactions_row main_row'>
                
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
                
                <div className='interactions_col severity'>
                    {severity}
                </div>

                <div className=' interactions_col description'>
                    <p>
                        {props.description}
                    </p>
                </div>

            </div>

            <div className='interactions_row'>
                <div className='interactions_col label_col'>
                    Extended Description
                </div>

                <div className='interactions_col'>
                    <div className='truncate_overflow'>
                        {extendedDescription}
                    </div> 
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