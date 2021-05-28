import * as React from 'react';
import {useCallback} from 'react';
import './signin.css';
import {useHistory} from 'react-router';
import BackgroundFront from '../../assets/images/bomber.png';
import BackgroundBack from '../../assets/images/planet.png';
import {Button, EButtonColor, EButtonType} from '../../components/button';
import {Form} from '../../components/form';
import {Input} from '../../components/input';
import {consts} from '../../consts';
import {useInput} from '../../hoc/use-input';
import {EValidationType} from '../../hoc/use-validation';
import {apiSignUp, Data} from '../../services/api';

export default function Signin() {
    const history = useHistory();
    const email = useInput('', [{type: EValidationType.IS_EMAIL, value: true}]);
    const password = useInput('', [
        {type: EValidationType.MIN_LENGTH, value: 4},
        {type: EValidationType.MAX_LENGTH, value: 15},
    ]);
    const login = useInput('', [
        {type: EValidationType.MIN_LENGTH, value: 4},
        {type: EValidationType.MAX_LENGTH, value: 15},
    ]);
    const name = useInput('', [
        {type: EValidationType.MIN_LENGTH, value: 4},
        {type: EValidationType.MAX_LENGTH, value: 15},
    ]);
    const passwordRepeat = useInput('', [
        {type: EValidationType.IS_PASSWORD_EQUAL, value: password.value},
    ]);
    const formData: Data = {
        login: login.value,
        name: name.value,
        email: email.value,
        newPassword: password.value,
    };
    const onSignUpClick = useCallback(() => {
        apiSignUp(formData)
            .then((result) => {
                if (result.status === 200) {
                    history.push('/start');
                } else {
                    return Promise.reject(new Error(result.status.toString()));
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [formData]);

    const arrayInputs = [
        <Input
            key="email"
            nameField={consts.signinPage.email}
            type="email"
            name="email"
            value={email.value}
            onChange={(e) => email.onChange(e)}
            onBlur={() => email.onBlur()}
            textError={email.isDirty ? email.errorText : ''}
        />,
        <Input
            key="login"
            nameField={consts.signinPage.login}
            type="text"
            name="login"
            textError={login.isDirty ? login.errorText : ''}
            value={login.value}
            onChange={(e) => login.onChange(e)}
            onBlur={() => login.onBlur()}
        />,
        <Input
            key="name"
            nameField={consts.signinPage.name}
            type="text"
            name="name"
            textError={name.isDirty ? name.errorText : ''}
            value={name.value}
            onChange={(e) => name.onChange(e)}
            onBlur={() => name.onBlur()}
        />,
        <Input
            key="password"
            nameField={consts.signinPage.password}
            type="password"
            name="password"
            textError={password.isDirty ? password.errorText : ''}
            value={password.value}
            onChange={(e) => password.onChange(e)}
            onBlur={() => password.onBlur()}
        />,
        <Input
            key="passwordRepeat"
            nameField={consts.signinPage.passwordRepeat}
            type="password"
            name="passwordRepeat"
            textError={passwordRepeat.isDirty ? passwordRepeat.errorText : ''}
            value={passwordRepeat.value}
            onChange={(e) => passwordRepeat.onChange(e)}
            onBlur={() => passwordRepeat.onBlur()}
        />,
    ];
    const arrayButtons = [
        <Button
            key={consts.signinPage.buttonBack}
            text={consts.signinPage.buttonBack}
            buttonColor={EButtonColor.PRIMARY}
            buttonType={EButtonType.FORM}
            onClick={() => history.goBack()}
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
            <img src={BackgroundBack as string} className="backgroundBack" alt="BackgroundBack" />
            <img
                src={BackgroundFront as string}
                className="backgroundFront"
                alt="BackgroundFront"
            />
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
        </div>
    );
}