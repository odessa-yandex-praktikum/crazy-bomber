import * as React from 'react';
import './styles.css';

export function Form(classForm: string, arrayInputs: JSX.Element[], arrayButtons: JSX.Element[]) {
    return (
        <div className={`form ${classForm}`}>
            {arrayInputs}
            <div className="form__buttons-container">{arrayButtons}</div>
        </div>
    );
}
