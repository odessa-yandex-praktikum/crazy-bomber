import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {consts} from '../consts';

export enum EValidationType {
    MIN_LENGTH = 'MIN_LENGTH',
    MAX_LENGTH = 'MAX_LENGTH',
    IS_EMAIL = 'IS_EMAIL',
    IS_PASSWORD_EQUAL = 'IS_PASSWORD_EQUAL',
}

export interface Validation {
    type: EValidationType;
    value: number | boolean | string;
}

export const useValidation = (value: string, validations: Validation[]) => {
    const [errorText, setErrorText]: [
        null | string,
        Dispatch<SetStateAction<null | string>>
    ] = useState(null);
    const [inputValid, setInputValid] = useState(true);
    const re = RegExp(/.+@.+\..+/i);

    useEffect(() => {
        setErrorText(null);
        if (value === '') {
            setErrorText(consts.error.errorIsEmpty);
            return;
        }
        validations.some((validation: Validation) => {
            switch (validation.type) {
                case EValidationType.MIN_LENGTH:
                    if (value.length < validation.value) {
                        setErrorText(consts.error.errorMinLength);
                    }
                    break;
                case EValidationType.MAX_LENGTH:
                    if (value.length > validation.value) {
                        setErrorText(consts.error.errorMaxLength);
                    }
                    break;
                case EValidationType.IS_EMAIL:
                    if (!re.test(String(value).toLowerCase())) {
                        setErrorText(consts.error.errorEmail);
                    }
                    break;
                case EValidationType.IS_PASSWORD_EQUAL:
                    if (value !== validation.value) {
                        setErrorText(consts.error.errorPasswordRepeat);
                    }
                    break;
            }
            return errorText;
        });
    }, [value]);

    useEffect(() => {
        setInputValid(errorText === null);
    }, [errorText]);

    return {
        errorText,
        inputValid,
    };
};
