import * as React from 'react';
import './styles.css';

export function Button(
    textButton: string,
    buttonClass: string,
    type?: 'button' | 'submit' | undefined | 'reset'
) {
    return (
        <button className={buttonClass} type={type}>
            {textButton}
        </button>
    );
}
