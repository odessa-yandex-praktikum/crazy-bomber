import * as React from 'react';
import './profile.css';
import BackLink from '../../components/backLink';
import {Button, EButtonColour, EButtonType} from '../../components/button';
import {Form} from '../../components/form';
import {Input} from '../../components/input';
import {consts} from '../../consts';

export default function Profile() {
    const pageTitle = consts.profilePage.pageTitle;
    const currentUser = {
        id: 1,
        img: 'https://freesvg.org/img/1514826571.png',
        email: 'vasia@mail.ru',
        login: 'Vasia001',
        name: 'Vasia',
        password: 'testtest',
        score: '0000123',
    };

    const arrayInputs = [
        <Input
            key="email"
            nameField={consts.profilePage.email}
            type="text"
            name="email"
            textError={consts.error.errorTextEmptyField}
            className="profile-page__input"
        />,
        <Input
            key="login"
            nameField={consts.profilePage.login}
            type="text"
            name="login"
            textError={consts.error.errorTextEmptyField}
            className="profile-page__input"
        />,
        <Input
            key="oldPassword"
            nameField={consts.profilePage.oldPassword}
            type="password"
            name="oldPassword"
            textError={consts.error.errorTextEmptyField}
            className="profile-page__input"
        />,
        <Input
            key="newPassword"
            nameField={consts.profilePage.newPassword}
            type="password"
            name="newPassword"
            textError={consts.error.errorTextEmptyField}
            className="profile-page__input"
        />,
        <Input
            key="newPasswordRepeat"
            nameField={consts.profilePage.newPassword}
            type="password"
            name="newPasswordRepeat"
            textError={consts.error.errorTextEmptyField}
            className="profile-page__input"
        />,
    ];
    const arrayButtons = [
        <Button
            key={consts.profilePage.buttonSave}
            text={consts.profilePage.buttonSave}
            buttonColour={EButtonColour.PRIMARY}
            buttonType={EButtonType.PROFILE_FORM}
        />,
        <Button
            key={consts.profilePage.buttonChange}
            text={consts.profilePage.buttonChange}
            buttonColour={EButtonColour.PRIMARY}
            buttonType={EButtonType.PROFILE_FORM}
        />,
    ];

    return (
        <div className="profile-page profile-page__background">
            <div className="container__page-title">
                <h2 className="page-title">{pageTitle}</h2>
            </div>
            <main className="container__page-content">
                <BackLink />
                <div className="profile-page__container">
                    <div className="profile-page__user-info">
                        <div className="profile-page__common-info">
                            <img src={currentUser.img} alt="" />
                            <span className="profile-page__user-name">{currentUser.name}</span>
                        </div>
                        <div>
                            <span className="profile-page__score">Score: {currentUser.score}</span>
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
    );
}
