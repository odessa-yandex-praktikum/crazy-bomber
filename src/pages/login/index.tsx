import {Button, EButtonColor, EButtonType} from 'components/button';
import {Form} from 'components/form';
import {EFullScreenPosition, FullScreen} from 'components/full-screen';
import {Input} from 'components/input';
import * as React from 'react';
import './login.css';
import {useCallback, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {yandexLogin} from '../../action';
import {consts} from '../../consts';
import {useInput} from '../../hooks/use-input';
import {EValidationType} from '../../hooks/use-validation';
import {Data} from '../../services/api/user-api';
import {userActions} from '../../store/actions/userActions';
import {useTypedSelector} from '../../store/hooks/useTypedSelector';

export default function Login() {
    const history = useHistory();
    const dispatch = useDispatch();
    const errorMessage = useTypedSelector((state) => state.user.error);
    const [loginError, setLoginError] = useState(errorMessage);
    let {theme = 'GREY'} = useTypedSelector((state) => state.user);

    const login = useInput('', [
        {type: EValidationType.REQUIRED, value: true},
        {type: EValidationType.MIN_LENGTH, value: 4},
        {type: EValidationType.MAX_LENGTH, value: 15},
    ]);
    const password = useInput('', [
        {type: EValidationType.REQUIRED, value: true},
        {type: EValidationType.MIN_LENGTH, value: 4},
        {type: EValidationType.MAX_LENGTH, value: 15},
    ]);

    const formData: Data = {
        login: login.value,
        password: password.value,
    };

    useEffect(() => {
        if (errorMessage) {
            setLoginError(errorMessage);
        }
    }, [errorMessage]);

    const onSignInClick = useCallback(() => {
        dispatch(userActions.login(formData, history));
    }, [formData]);

    const onOAuthClick = useCallback(() => {
        yandexLogin();
    }, []);

    const arrayInputs = [
        <Input
            key="login"
            nameField={consts.loginPage.login}
            type="text"
            name="login"
            textError={login.isDirty ? login.errorText : ''}
            value={login.value}
            onChange={useCallback((e) => login.onChange(e), [])}
            onBlur={useCallback(() => login.onBlur(), [])}
        />,
        <Input
            key="password"
            nameField={consts.loginPage.password}
            type="password"
            name="password"
            textError={password.isDirty ? password.errorText : ''}
            value={password.value}
            onChange={useCallback((e) => password.onChange(e), [])}
            onBlur={useCallback(() => password.onBlur(), [])}
        />,
    ];
    const arrayButtons = [
        <Button
            key={consts.loginPage.buttonOK}
            text={consts.loginPage.buttonOK}
            buttonColor={EButtonColor.PRIMARY}
            buttonType={EButtonType.FORM}
            onClick={onSignInClick}
            disabled={!password.inputValid || !login.inputValid}
        />,
        <Button
            key={consts.loginPage.buttonSignUp}
            text={consts.loginPage.buttonSignUp}
            buttonColor={EButtonColor.PRIMARY}
            buttonType={EButtonType.FORM}
            onClick={useCallback(() => history.push('/signin'), [])}
        />,
        <Button
            key={consts.loginPage.buttonOAuth}
            text={consts.loginPage.buttonOAuth}
            buttonColor={EButtonColor.ERROR}
            buttonType={EButtonType.OAUTH}
            onClick={onOAuthClick}
        />,
    ];
    return (
        <div className="page-with-bomber">
            <div className="form-error">{loginError}</div>
            <span className="games-title">{consts.gamesTitle}</span>
            <div>
                <Form
                    classForm={`login__form form__theme-${theme}`}
                    arrayInputs={arrayInputs}
                    arrayButtons={arrayButtons}
                />
            </div>
            <FullScreen position={EFullScreenPosition.RIGHT_TOP} />
        </div>
    );
}
