import * as React from 'react';
import './signin.css';
import BackgroundBack from '../../assets/images/planet.png';
import BackgroundFront from '../../assets/images/bomber.png';
import {Input} from '../../components/input';
import {Button, EButtonColour, EButtonType} from '../../components/button';
import {translations} from '../../translations';
import {Form} from '../../components/form';

export function Signin() {
    const arrayInputs = [
        <Input
            key={'email'}
            nameField={translations.signinPage.email}
            type={'text'}
            name={'email'}
            textError={translations.error.errorTextEmptyField}
        />,
        <Input
            key={'login'}
            nameField={translations.signinPage.login}
            type={'text'}
            name={'login'}
            textError={translations.error.errorTextEmptyField}
        />,
        <Input
            key={'first_name'}
            nameField={translations.signinPage.name}
            type={'text'}
            name={'first_name'}
            textError={translations.error.errorTextEmptyField}
        />,
        <Input
            key={'password'}
            nameField={translations.signinPage.password}
            type={'password'}
            name={'password'}
            textError={translations.error.errorTextEmptyField}
        />,
        <Input
            key={'passwordRepeat'}
            nameField={translations.signinPage.passwordRepeat}
            type={'password'}
            name={'passwordRepeat'}
            textError={translations.error.errorTextEmptyField}
        />,
    ];
    const arrayButtons = [
        <Button
            key={translations.signinPage.buttonBack}
            text={translations.signinPage.buttonBack}
            buttonColour={EButtonColour.PRIMARY}
            buttonType={EButtonType.FORM}
        />,
        <Button
            key={translations.signinPage.buttonSignIn}
            text={translations.signinPage.buttonSignIn}
            buttonColour={EButtonColour.PRIMARY}
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
                    classForm={'signin__form'}
                    arrayInputs={arrayInputs}
                    arrayButtons={arrayButtons}
                />
            </div>
        </div>
    );
}
