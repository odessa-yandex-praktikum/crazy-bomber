import * as React from 'react';
import './button.css';
import {ButtonHTMLAttributes, FC} from 'react';

export enum EButtonColor {
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
    buttonColor: EButtonColor;
    buttonType: EButtonType;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type Props = FC<TButtonProps>;

export const Button: Props = ({
    text,
    buttonColor,
    buttonType,
    className = '',
    ...otherProps
}: TButtonProps) => {
    return (
        <button
            {...otherProps}
            className={`${getButtonClass(buttonColor, buttonType)} ${className}`}
            type="button"
        >
            {text}
        </button>
    );
};

function getButtonClass(buttonColor: EButtonColor, buttonType: EButtonType): string {
    let cssString = 'button';
    switch (buttonColor) {
        case EButtonColor.PRIMARY: {
            cssString += ' color-primary';
            break;
        }
        case EButtonColor.SECONDARY: {
            cssString += ' color-secondary';
            break;
        }
        case EButtonColor.ERROR: {
            cssString += ' color-error';
            break;
        }
    }
    switch (buttonType) {
        case EButtonType.FORM: {
            cssString += ' button__type-form';
            break;
        }
        case EButtonType.ERROR: {
            cssString += ' button__type-error';
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
