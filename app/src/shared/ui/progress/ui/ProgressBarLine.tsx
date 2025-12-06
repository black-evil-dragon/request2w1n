import type { FC } from 'react';

import classNames from 'classnames';


import styles from './progress-bar-line.module.scss'


export const ProgressBarLine: FC<{
    progress: number,
    isLoading: boolean

    className?: string,
}> = ({
    progress,
    isLoading,

    className = ""
}) => {


    
    return (<>
        <div className={
            classNames(
                styles.progress,
                isLoading && styles.progressShow,
                className
            )
            }
            style={{ backgroundSize: `${progress}% 2px` }}
        >
            
        </div>
    </>);
};