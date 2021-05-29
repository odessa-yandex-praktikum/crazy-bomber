import {ChangeEvent, useCallback, useState} from 'react';
import {useValidation, Validation} from './use-validation';

export const useInput = (initialValue: string, validations: Validation[], mayBeEmpty?: boolean) => {
    const [value, setValue] = useState(initialValue);
    const [isDirty, setDirty] = useState(false);
    const valid = useValidation(value, validations, mayBeEmpty);

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }, []);

    const onBlur = useCallback(() => {
        setDirty(true);
    }, []);

    return {
        value,
        onChange,
        onBlur,
        isDirty,
        ...valid,
    };
};
