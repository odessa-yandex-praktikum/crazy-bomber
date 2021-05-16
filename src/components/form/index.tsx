import * as React from 'react';
import './form.css';
import {ReactElement} from 'react';
import {TButtonProps} from '../button';
import {TInputProps} from '../input';

/**
 * @param classForm класс задающий размеры формы.
 * @param arrayInputs массив инпутов формы.
 * @param arrayButtons массив кнопок формы.
 */
export type TFormProps = {
    classForm: string;
    arrayInputs: (ReactElement<TInputProps> | null)[];
    arrayButtons: (ReactElement<TButtonProps> | null)[];
};

export const Form: React.FC<TFormProps> = ({classForm, arrayInputs, arrayButtons}: TFormProps) => {
    return (
        <div className={`form ${classForm}`}>
            {arrayInputs}
            <div className="form__buttons-container">{arrayButtons}</div>
        </div>
    );
};
