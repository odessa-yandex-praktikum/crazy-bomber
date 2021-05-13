import * as React from 'react';
import './profile.css';
import BackgroundBack from '../../assets/images/planet.png';
import {Button, EButtonColour, EButtonType} from '../../components/button';
import {Form} from '../../components/form';
import {Input} from '../../components/input';
import {consts} from '../../consts';

export default function Profile() {
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
        />,
        <Input
            key="login"
            nameField={consts.profilePage.login}
            type="text"
            name="login"
            textError={consts.error.errorTextEmptyField}
        />,
        <Input
            key="oldPassword"
            nameField={consts.profilePage.oldPassword}
            type="password"
            name="oldPassword"
            textError={consts.error.errorTextEmptyField}
        />,
        <Input
            key="newPassword"
            nameField={consts.profilePage.newPassword}
            type="password"
            name="newPassword"
            textError={consts.error.errorTextEmptyField}
        />,
        <Input
            key="newPasswordRepeat"
            nameField={consts.profilePage.newPassword}
            type="password"
            name="newPasswordRepeat"
            textError={consts.error.errorTextEmptyField}
        />,
    ];
    const arrayButtons = [
        <Button
            key={consts.profilePage.buttonSave}
            text={consts.profilePage.buttonSave}
            buttonColour={EButtonColour.PRIMARY}
            buttonType={EButtonType.FORM}
        />,
        <Button
            key={consts.profilePage.buttonChange}
            text={consts.profilePage.buttonChange}
            buttonColour={EButtonColour.PRIMARY}
            buttonType={EButtonType.FORM}
        />,
    ];

    return (
        <div className="profile-page">
            <img src={BackgroundBack as string} className="backgroundBack" alt="" />
            <div className="container__page-title">
                <h2 className="page-title">{consts.profilePage.pageTitle}</h2>
            </div>
            <main className="container__page-content">
                <a href="#" className="backlink">
                    {consts.profilePage.linkBack}
                </a>
                <div className="container__profile">
                    <div className="container__user-info">
                        <div className="common-info">
                            <img src={currentUser.img} alt="" />
                            <span>{currentUser.name}</span>
                        </div>
                        <div className="common-info-score">
                            <span>Score: {currentUser.score}</span>
                        </div>
                    </div>
                    <div className="container__page-form">
                        <Form
                            classForm={'profile__form'}
                            arrayInputs={arrayInputs}
                            arrayButtons={arrayButtons}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}
