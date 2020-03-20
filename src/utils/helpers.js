import { useEffect, useState } from "react";

// Custom Hooks ///
// debounces state values
export function useDebounce(state, ms) {
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

    return function () {
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
