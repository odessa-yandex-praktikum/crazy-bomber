import * as React from 'react';
import './input.css';
import {InputHTMLAttributes} from 'react';

/**
 * @param nameField текст, описание поля.
 * @param textError текст ошибки ввода.
 */
export type TInputProps = {
    nameField: string;
    textError: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<TInputProps> = ({
    nameField,
    textError,
    ...otherProps
}: TInputProps) => {
    return (
        <div className="container__input-with-error">
            <div className="container__input">
                <span>{nameField}</span>
                <input {...otherProps} />
            </div>
            <span className="input__error-text">{textError}</span>
        </div>
    );
};
