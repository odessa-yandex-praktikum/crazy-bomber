import * as React from 'react';
import './styles.css';

export function Input(nameField: string, type: string, nameInput: string, textError: string) {
    return (
        <div key={nameInput} className="container__input-with-error">
            <div className="container__input">
                <span>{nameField}</span>
                <input type={type} name={nameInput} />
            </div>
            <span className="input__error-text">{textError}</span>
        </div>
    );
}
