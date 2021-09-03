import * as React from 'react';
import './input.css';
import {InputHTMLAttributes} from 'react';
import {FC} from 'react';

/**
 * @param nameField текст, описание поля.
 * @param textError текст ошибки ввода.
 */
export type TInputProps = {
    nameField: string;
    textError: string | null;
} & InputHTMLAttributes<HTMLInputElement>;

type Props = FC<TInputProps>;

export const Input: Props = ({nameField, textError, ...otherProps}: TInputProps) => {
    return (
        <div className="container__input-with-error">
            <div className="container__input">
                <span>{nameField}</span>
                <input className="input" {...otherProps} />
            </div>
            <span className="input__error-text">{textError}</span>
        </div>
    );
};
