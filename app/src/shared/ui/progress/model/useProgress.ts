import { useState } from "react";


export const useProgress = () => {
    const [isLoading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const [intervalId, setIntervalId] = useState<number | null>(null)


    const createInterval = (speed: number, step: number) => {
        setIntervalId(intervalId => setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(intervalId!);
                    const timeout = setTimeout(() => {
                        setLoading(false)

                        clearTimeout(timeout)
                    }, step)
                    return 100;
                }
                return prev + .5;
            });
        }, speed))
    }

    const startProgress = (speed = 1, step = 0.5) => {
        setProgress(-25)

        createInterval(speed, step)
    }


    const stopProgress = () => {
        if (intervalId) {
            clearInterval(intervalId)
        }
    }

    const resetProgress = () => {
        setProgress(0)
    }

    const continueProgress = (speed = 1, step = 0.5) => {
        createInterval(speed, step)
    }

    return {
        progress,
        isLoading,

        startProgress,
        stopProgress,
        resetProgress,
        continueProgress
    }
}