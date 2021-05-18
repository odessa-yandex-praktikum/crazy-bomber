import * as React from 'react';
import './button.css';
import {ButtonHTMLAttributes, FC} from 'react';

export enum EButtonColour {
    PRIMARY, // black
    SECONDARY, // grey
    ERROR, // red
}

export enum EButtonType {
    FORM,
    ERROR,
    PROFILE_FORM,
    FORUM_PAGE,
}

/**
 * @param text текст кнопки.
 * @param  buttonColour определяет цвет кнопки.
 * @param buttonType определяет размер и отступы кнопки.
 */
export type TButtonProps = {
    text?: string;
    buttonColour: EButtonColour;
    buttonType: EButtonType;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type Props = FC<TButtonProps>;

export const Button: Props = ({text, buttonColour, buttonType, ...otherProps}: TButtonProps) => {
    return (
        <button {...otherProps} className={getButtonClass(buttonColour, buttonType)} type="button">
            {text}
        </button>
    );
};

function getButtonClass(buttonColour: EButtonColour, buttonType: EButtonType): string {
    let cssString = '';
    switch (buttonColour) {
        case EButtonColour.PRIMARY: {
            cssString += 'color-primary';
            break;
        }
        case EButtonColour.SECONDARY: {
            cssString += 'color-secondary';
            break;
        }
        case EButtonColour.ERROR: {
            cssString += 'color-error';
            break;
        }
    }
    switch (buttonType) {
        case EButtonType.FORM: {
            cssString += ' login-signin-form__button';
            break;
        }
        case EButtonType.ERROR: {
            cssString += ' error__button';
            break;
        }
        case EButtonType.PROFILE_FORM: {
            cssString += ' profile-form__button';
            break;
        }
        case EButtonType.FORUM_PAGE: {
            cssString += ' forum-page__button';
            break;
        }
    }
    return cssString;
}
