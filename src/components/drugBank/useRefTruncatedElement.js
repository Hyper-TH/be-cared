import { useLayoutEffect, useState } from 'react';

export const useRefTruncatedElement = ({ref}) => {
    const [isRefTruncated, setRefIsTruncated] = useState(false);
    const [isRefShowingMore, setRefIsShowingMore] = useState(false);

    useLayoutEffect(() => {
        const { offsetHeight, scrollHeight } = ref.current || {};

        if (offsetHeight && scrollHeight && offsetHeight < scrollHeight) {
            setRefIsTruncated(true);
        } else {
            setRefIsTruncated(false);
        }
    }, [ref]);

    const toggleRefIsShowingMore = () => setRefIsShowingMore(prev => !prev);

    return {
        isRefTruncated,
        isRefShowingMore,
        toggleRefIsShowingMore,
    };
};