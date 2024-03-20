import { useLayoutEffect, useState } from 'react';

export const useDescTruncatedElement = ({ref}) => {
    const [isDescTruncated, setDescIsTruncated] = useState(false);
    const [isDescShowingMore, setDescIsShowingMore] = useState(false);

    useLayoutEffect(() => {
        const { offsetHeight, scrollHeight } = ref.current || {};

        if (offsetHeight && scrollHeight && offsetHeight < scrollHeight) {
            setDescIsTruncated(true);
        } else {
            setDescIsTruncated(false);
        }
    }, [ref]);

    const toggleDescIsShowingMore = () => setDescIsShowingMore(prev => !prev);

    return {
        isDescTruncated,
        isDescShowingMore,
        toggleDescIsShowingMore,
    };
};