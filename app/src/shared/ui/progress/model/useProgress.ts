import { useEffect, useRef, useState } from "react";


export const useProgress = () => {
    const [isLoading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const intervalRef = useRef<null | number>(null);

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    const clearCurrentInterval = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const createInterval = (speed: number, step: number) => {
        clearCurrentInterval()

        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearCurrentInterval();
                    return 100;
                }
                return prev + step;
            });
        }, speed)

        intervalRef.current = interval;
    }


    const startProgress = (speed = 10, step = 0.25) => {
        setProgress(0)
        setLoading(true)

        createInterval(speed, step)
    }


    const completeProgress = (callback: () => Promise<void> = async()=>{}, sleep: number = 0) => {
        clearCurrentInterval();

        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearCurrentInterval();


                    const timeout = setTimeout(() => {
                        callback().then(function () {
                            setLoading(false)
                            clearTimeout(timeout)
                        })
                        
                    }, sleep)

                    return 100;
                }
                return prev + 1;
            });
        }, 5)

        intervalRef.current = interval;
    }


    const stopProgress = () => {
        clearCurrentInterval();
    }

    const continueProgress = (speed = 1, step = 0.5) => {
        createInterval(speed, step)
    }

    const resetProgress = () => {
        setProgress(-25)
    }


    return {
        progress,
        isLoading,

        startProgress,
        stopProgress,
        resetProgress,
        continueProgress,
        completeProgress
    }
}