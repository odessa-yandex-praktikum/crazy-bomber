import * as React from 'react';
import './login.css';
import BackgroundBack from '../../assets/images/planet.png';
import BackgroundFront from '../../assets/images/bomber.png';
import {Input} from '../../components/input';
import {Button, EButtonColor, EButtonType} from '../../components/button';
import {translations} from '../../translations';
import {Form} from '../../components/form';

export default function Login() {
    const arrayInputs = [
        <Input
            key="login"
            nameField={translations.loginPage.login}
            type="text"
            name="login"
            textError={translations.error.errorTextEmptyField}
        />,
        <Input
            key="password"
            nameField={translations.loginPage.password}
            type="password"
            name="password"
            textError={translations.error.errorTextEmptyField}
        />,
    ];
    const arrayButtons = [
        <Button
            key={translations.loginPage.buttonOK}
            text={translations.loginPage.buttonOK}
            buttonColor={EButtonColor.PRIMARY}
            buttonType={EButtonType.FORM}
        />,
        <Button
            key={translations.loginPage.buttonSignUp}
            text={translations.loginPage.buttonSignUp}
            buttonColor={EButtonColor.PRIMARY}
            buttonType={EButtonType.FORM}
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
            <div className="container__games-title">
                <span className="games-title">{translations.gamesTitle}</span>
            </div>
            <div className="container__form">
                <Form
                    classForm={'login__form'}
                    arrayInputs={arrayInputs}
                    arrayButtons={arrayButtons}
                />
            </div>
        </div>
    );
}
