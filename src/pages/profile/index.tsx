import * as React from 'react';
import './profile.css';
import {useCallback, useState} from 'react';
import {BackLink} from '../../components/backLink';
import {Button, EButtonColor, EButtonType} from '../../components/button';
import {Form} from '../../components/form';
import {Input} from '../../components/input';
import {Navigation} from '../../components/navigation';
import {consts} from '../../consts';
import {useInput} from '../../hoc/use-input';
import {EValidationType} from '../../hoc/use-validation';
import {changePassword, changeUserProfile, Data} from '../../services/api';

export default function Profile() {
    const pageTitle = consts.profilePage.pageTitle;
    const navLinkStart = consts.navigation.navLinkStart;
    const navLinkForum = consts.navigation.navLinkForum;
    const navLinkLeaderboard = consts.navigation.navLinkLeaderboard;
    const navLinkLogout = consts.navigation.navLinkLogout;
    const currentUser = {
        id: 1,
        img: 'https://freesvg.org/img/1514826571.png',
        email: 'vasia@mail.ru',
        login: 'Vasia001',
        name: 'Vasia',
        password: 'testtest',
        score: '0000123',
    };
    const email = useInput(currentUser.email, [
        {type: EValidationType.REQUIRED, value: true},
        {type: EValidationType.IS_EMAIL, value: true},
    ]);
    const name = useInput(currentUser.name, [
        {type: EValidationType.REQUIRED, value: true},
        {type: EValidationType.MIN_LENGTH, value: 4},
        {type: EValidationType.MAX_LENGTH, value: 15},
    ]);
    const login = useInput(currentUser.login, [
        {type: EValidationType.REQUIRED, value: true},
        {type: EValidationType.MIN_LENGTH, value: 4},
        {type: EValidationType.MAX_LENGTH, value: 15},
    ]);
    const oldPassword = useInput('', []);
    const newPassword = useInput('', [
        {type: EValidationType.MIN_LENGTH, value: 4},
        {type: EValidationType.MAX_LENGTH, value: 15},
    ]);
    const newPasswordRepeat = useInput('', [
        {type: EValidationType.IS_PASSWORD_EQUAL, value: newPassword.value},
    ]);
    const formData: Data = {
        login: login.value,
        name: name.value,
        oldPassword: oldPassword.value,
        newPassword: newPassword.value,
        email: email.value,
    };
    const [passwordError, setPasswordError] = useState('');
    const onSaveChangesClick = useCallback(() => {
        setPasswordError('');
        if (
            !email.inputValid ||
            !name.inputValid ||
            !login.inputValid ||
            !newPasswordRepeat.inputValid ||
            newPassword.value !== newPasswordRepeat.value
        ) {
            email.isDirty = true;
            name.isDirty = true;
            login.isDirty = true;
            newPasswordRepeat.isDirty = true;
            newPassword.isDirty = true;
        } else {
            changeUserProfile(formData)
                .then((result) => {
                    if (result.status !== 200) {
                        return Promise.reject(new Error(result.status.toString()));
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
            if (newPassword.value !== '') {
                changePassword(formData)
                    .then((response) => {
                        if (response.status !== 200) {
                            return response
                                .json()
                                .then((result) => setPasswordError(result.reason));
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
    }, [formData]);

    const arrayInputs = [
        <Input
            key="email"
            nameField={consts.profilePage.email}
            type="text"
            name="email"
            value={email.value}
            onChange={(e) => email.onChange(e)}
            onBlur={() => email.onBlur()}
            textError={email.isDirty ? email.errorText : ''}
        />,
        <Input
            key="login"
            nameField={consts.profilePage.login}
            type="text"
            name="login"
            textError={login.isDirty ? login.errorText : ''}
            value={login.value}
            onChange={(e) => login.onChange(e)}
            onBlur={() => login.onBlur()}
        />,
        <Input
            key="name"
            nameField={consts.profilePage.name}
            type="text"
            name="name"
            textError={name.isDirty ? name.errorText : ''}
            value={name.value}
            onChange={(e) => name.onChange(e)}
            onBlur={() => name.onBlur()}
        />,
        <Input
            key="oldPassword"
            nameField={consts.profilePage.oldPassword}
            type="password"
            name="oldPassword"
            textError={oldPassword.isDirty ? oldPassword.errorText : ''}
            value={oldPassword.value}
            onChange={(e) => oldPassword.onChange(e)}
            onBlur={() => oldPassword.onBlur()}
        />,
        <Input
            key="newPassword"
            nameField={consts.profilePage.newPassword}
            type="password"
            name="newPassword"
            textError={newPassword.isDirty ? newPassword.errorText : ''}
            value={newPassword.value}
            onChange={(e) => newPassword.onChange(e)}
            onBlur={() => newPassword.onBlur()}
        />,
        <Input
            key="newPasswordRepeat"
            nameField={consts.profilePage.newPassword}
            type="password"
            name="newPasswordRepeat"
            textError={newPasswordRepeat.errorText}
            value={newPasswordRepeat.value}
            onChange={(e) => newPasswordRepeat.onChange(e)}
            onBlur={() => newPasswordRepeat.onBlur()}
        />,
    ];
    const arrayButtons = [
        <Button
            key={consts.profilePage.buttonSaveChanges}
            text={consts.profilePage.buttonSaveChanges}
            buttonColor={EButtonColor.PRIMARY}
            buttonType={EButtonType.PROFILE_FORM}
            onClick={onSaveChangesClick}
        />,
    ];

    const navigationItems = [navLinkStart, navLinkForum, navLinkLeaderboard, navLinkLogout];

    return (
        <div className="profile-page profile-page__background">
            <div className="form-error">{passwordError}</div>;
            <div className="container__left-part">
                <Navigation navigationItems={navigationItems} />
                <BackLink />
            </div>
            <div className="container__right-part">
                <div className="container__page-title">
                    <h2 className="page-title">{pageTitle}</h2>
                </div>
                <main className="container__page-content">
                    <div className="profile-page__container">
                        <div className="profile-page__user-info">
                            <div className="profile-page__common-info">
                                <img src={currentUser.img} alt="" />
                                <span className="profile-page__user-name">{currentUser.name}</span>
                            </div>
                            <div>
                                <span className="profile-page__score">
                                    Score: {currentUser.score}
                                </span>
                            </div>
                        </div>
                        <Form
                            classForm="profile-page__form"
                            arrayInputs={arrayInputs}
                            arrayButtons={arrayButtons}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
}
