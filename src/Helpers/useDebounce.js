

function useDebouce(fn, wait) {
    const timerRef = useRef();
    return function (...arg) {
        if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        }

        timerRef.current = window.setTimeout(() => {
        fn(...arg);
        }, wait);
    };
}