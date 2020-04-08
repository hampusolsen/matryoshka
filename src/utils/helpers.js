import { useEffect, useState } from "react";

// Custom Hooks ///
// debounces state values
export function useDebounce(state, ms = 600) {
    const [debouncedState, setDebouncedState] = useState(state);

    useEffect(
        () => {
            const timeout = setTimeout(() => {
                setDebouncedState(state);
            }, ms);

            return () => {
                clearTimeout(timeout);
            };
        },
        [ms, state]
    );

    return debouncedState;
}

// General Helpers ///
// debounces functions
export function debounce(fn, ms, immediate) {
    let timeout;

    return () => {
        const args = Array.from(arguments);
        const callNow = immediate && !timeout;

        if (timeout !== null) clearTimeout(timeout);

        timeout = setTimeout(() => {
            timeout = null;
            if (!immediate) fn.apply(this, args);
        }, ms);

        if (callNow) fn.apply(this, args);
    };
}

// Converts file size from numerical bytes to readable string
export function convertFileSizeToReadable(bytes) {
    const exp = Math.log(bytes) / Math.log(1024) | 0;
    const result = exp ? (bytes / Math.pow(1024, exp)).toFixed(2) : bytes;

    return `${result} ${exp === 0 ? 'bytes' : 'KMGT'[exp-1] + 'B'}`;
}