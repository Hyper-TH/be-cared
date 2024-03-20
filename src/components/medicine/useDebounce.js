import { useEffect } from "react";
import { useState } from "react";

export const useDebounce = (value, delay = 250) => {
    const [debouncedValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebounceValue(value);
        }, delay);

        return () => clearTimeout(timeout);

    }, [value, delay]);

    return debouncedValue;
};