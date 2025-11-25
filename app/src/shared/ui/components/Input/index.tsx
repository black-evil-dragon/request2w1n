import { useEffect, useState, type FC } from "react";
import classNames from "classnames";


import styles from './input.module.scss'



export type InputMessageType = {
    text: string;
    type?: 'danger' | 'warning' | 'info';
} | null;


type InputProps = {
    name: string;
    onChange: (value: string) => void;

    className?: string;

    type?: 'text' | 'email' | 'password' | 'number' | 'tel';
    initialValue?: string;

    placeholder?: string;
    required?: boolean;

    externalMessage?: InputMessageType;

    onChangeEvent?: null | ((event: React.ChangeEvent<HTMLInputElement>) => void);
}


export const Input: FC<InputProps> = ({
    name,
    onChange,

    externalMessage = null,


    className = '',

    type = 'text',
    initialValue = '',
    placeholder = '',
    required = false,

    onChangeEvent = null,

}) => {

    const [value, setValue] = useState(initialValue)
    const [focus, setFocus] = useState(initialValue ? true : false)

    
    const [message, setMessage] = useState<InputMessageType>(externalMessage);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event?.target.value)
        onChange(event?.target.value)

        if (onChangeEvent) {
            onChangeEvent(event)
        }

        if (message?.text) {
            setMessage(null)
        }
    }


    const handleOnBlur = () => {
        if (required && !value) {
            setMessage({
                text: 'Обязательное поле',
                type: 'danger'
            })
        }
        
        setFocus(false)
    }

    useEffect(() => {
        setMessage(externalMessage)

    }, [externalMessage])


    return (<>

        <div
            className={classNames(className, styles.wrapper)}
        >  
            {placeholder &&
                <span className={classNames(styles.label, (focus || value) && styles.labelMoved)}>
                    {placeholder}
                    {required && <span className={styles.labelRequired}>*</span>}
                </span>
            }

            <input
                className={classNames(styles.input, value && styles.inputHasValue)}

                name={name}
                type={type}
                value={value}
                required={required}


                onChange={handleChange}

                onBlur={handleOnBlur}
                onFocus={() => setFocus(true)}
                

            />

            <div className={classNames(
                styles.message,
                message && styles.messageShow,
                message?.type && styles[message.type]
            )}>
                {/* Обязательное поле */}
                {message && message.text}
            </div>
        </div>
    
    </>);
}
