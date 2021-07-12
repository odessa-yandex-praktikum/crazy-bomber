import {Button, EButtonColor, EButtonType} from 'components/button';
import {Form} from 'components/form';
import {EFullScreenPosition, FullScreen} from 'components/full-screen';
import {Input} from 'components/input';
import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import './signin.css';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {consts} from '../../consts';
import {useInput} from '../../hooks/use-input';
import {EValidationType} from '../../hooks/use-validation';
import {Data} from '../../services/api/user-api';
import {userActions} from '../../store/actions/userActions';
import {useTypedSelector} from '../../store/hooks/useTypedSelector';

export default function Signin() {
    const history = useHistory();
    const dispatch = useDispatch();
    const errorMessage = useTypedSelector((state) => state.user.error);
    const [signupError, setSignupError] = useState(errorMessage);

    const email = useInput('', [
        {type: EValidationType.REQUIRED, value: true},
        {type: EValidationType.IS_EMAIL, value: true},
    ]);
    const password = useInput('', [
        {type: EValidationType.REQUIRED, value: true},
        {type: EValidationType.MIN_LENGTH, value: 4},
        {type: EValidationType.MAX_LENGTH, value: 15},
    ]);
    const login = useInput('', [
        {type: EValidationType.REQUIRED, value: true},
        {type: EValidationType.MIN_LENGTH, value: 4},
        {type: EValidationType.MAX_LENGTH, value: 15},
    ]);
    const name = useInput('', [
        {type: EValidationType.REQUIRED, value: true},
        {type: EValidationType.MIN_LENGTH, value: 4},
        {type: EValidationType.MAX_LENGTH, value: 15},
    ]);
    const passwordRepeat = useInput('', [
        {type: EValidationType.REQUIRED, value: true},
        {type: EValidationType.IS_PASSWORD_EQUAL, value: password.value},
    ]);
    const formData: Data = {
        login: login.value,
        name: name.value,
        email: email.value,
        newPassword: password.value,
    };

    useEffect(() => {
        if (errorMessage) {
            setSignupError(errorMessage);
        }
    }, [errorMessage]);

    const onSignUpClick = useCallback(() => {
        dispatch(userActions.register(formData, history));
    }, [formData]);

    const arrayInputs = [
        <Input
            key="email"
            nameField={consts.signinPage.email}
            type="email"
            name="email"
            value={email.value}
            onChange={useCallback((e) => email.onChange(e), [])}
            onBlur={useCallback(() => email.onBlur(), [])}
            textError={email.isDirty ? email.errorText : ''}
        />,
        <Input
            key="login"
            nameField={consts.signinPage.login}
            type="text"
            name="login"
            textError={login.isDirty ? login.errorText : ''}
            value={login.value}
            onChange={useCallback((e) => login.onChange(e), [])}
            onBlur={useCallback(() => login.onBlur(), [])}
        />,
        <Input
            key="name"
            nameField={consts.signinPage.name}
            type="text"
            name="name"
            textError={name.isDirty ? name.errorText : ''}
            value={name.value}
            onChange={useCallback((e) => name.onChange(e), [])}
            onBlur={useCallback(() => name.onBlur(), [])}
        />,
        <Input
            key="password"
            nameField={consts.signinPage.password}
            type="password"
            name="password"
            textError={password.isDirty ? password.errorText : ''}
            value={password.value}
            onChange={useCallback((e) => password.onChange(e), [])}
            onBlur={useCallback(() => password.onBlur(), [])}
        />,
        <Input
            key="passwordRepeat"
            nameField={consts.signinPage.passwordRepeat}
            type="password"
            name="passwordRepeat"
            textError={passwordRepeat.isDirty ? passwordRepeat.errorText : ''}
            value={passwordRepeat.value}
            onChange={useCallback((e) => passwordRepeat.onChange(e), [])}
            onBlur={useCallback(() => passwordRepeat.onBlur(), [])}
        />,
    ];
    const arrayButtons = [
        <Button
            key={consts.signinPage.buttonBack}
            text={consts.signinPage.buttonBack}
            buttonColor={EButtonColor.PRIMARY}
            buttonType={EButtonType.FORM}
            onClick={useCallback(() => history.goBack(), [])}
        />,
        <Button
            key={consts.signinPage.buttonSignIn}
            text={consts.signinPage.buttonSignIn}
            buttonColor={EButtonColor.PRIMARY}
            buttonType={EButtonType.FORM}
            onClick={onSignUpClick}
            disabled={
                !email.inputValid ||
                !password.inputValid ||
                !name.inputValid ||
                !passwordRepeat.inputValid ||
                !login.inputValid
            }
        />,
    ];

    return (
        <div className="login-signin-page">
            <div className="form-error">{signupError}</div>
            <div className="container__games-title">
                <span className="games-title">{consts.gamesTitle}</span>
            </div>
            <div className="container__form">
                <Form
                    classForm={'signin__form'}
                    arrayInputs={arrayInputs}
                    arrayButtons={arrayButtons}
                />
            </div>
            <FullScreen position={EFullScreenPosition.RIGHT_TOP} />
        </div>
    );
}
