import * as React from 'react';
import './login.css';
import {useCallback, useState} from 'react';
import {useHistory} from 'react-router';
import BackgroundFront from '../../assets/images/bomber.png';
import BackgroundBack from '../../assets/images/planet.png';
import {Button, EButtonColor, EButtonType} from '../../components/button';
import {Form} from '../../components/form';
import {Input} from '../../components/input';
import {consts} from '../../consts';
import {useInput} from '../../hoc/use-input';
import {EValidationType} from '../../hoc/use-validation';
import {apiSignIn, Data} from '../../services/api';
import {EFullScreenPosition, FullScreen} from '../../components/full-screen';

export default function Login() {
    const history = useHistory();
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
    const [loginError, setLoginError] = useState('');
    const formData: Data = {
        login: login.value,
        password: password.value,
    };
    const onSignInClick = useCallback(() => {
        setLoginError('');
        apiSignIn(formData)
            .then(() => {
                history.push('/start');
            })
            .catch((error: Error) => {
                setLoginError(error.message);
            });
    }, [formData]);

    const arrayInputs = [
        <Input
            key="login"
            nameField={consts.loginPage.login}
            type="text"
            name="login"
            textError={login.isDirty ? login.errorText : ''}
            value={login.value}
            onChange={(e) => login.onChange(e)}
            onBlur={() => login.onBlur()}
        />,
        <Input
            key="password"
            nameField={consts.loginPage.password}
            type="password"
            name="password"
            textError={password.isDirty ? password.errorText : ''}
            value={password.value}
            onChange={(e) => password.onChange(e)}
            onBlur={() => password.onBlur()}
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
            onClick={() => history.push('/signin')}
        />,
    ];
    return (
        <div className="login-signin-page">
            <img src={BackgroundBack as string} className="backgroundBack" alt="BackgroundBack" />
            <img
                src={BackgroundFront as string}
                className="backgroundFront"
                alt="BackgroundFront"
            />
            <div className="form-error">{loginError}</div>;
            <div className="container__games-title">
                <span className="games-title">{consts.gamesTitle}</span>
            </div>
            <div className="container__form">
                <Form
                    classForm="login__form"
                    arrayInputs={arrayInputs}
                    arrayButtons={arrayButtons}
                />
            </div>
            <FullScreen position={EFullScreenPosition.RIGHT_TOP} />
        </div>
    );
}
