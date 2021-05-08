import * as React from 'react';
import './profile.css';
import {consts} from '../../consts';
import BackgroundBack from '../../assets/images/planet.png';
import {Input} from '../../components/input';
import {Button} from '../../components/button';
import {Form} from '../../components/form';

export function Profile() {
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
        Input(consts.profilePage.email, 'text', 'email', consts.error.errorTextEmptyField),
        Input(consts.profilePage.login, 'text', 'login', consts.error.errorTextEmptyField),
        Input(
            consts.profilePage.oldPassword,
            'password',
            'password',
            consts.error.errorTextEmptyField
        ),
        Input(
            consts.profilePage.newPassword,
            'password',
            'newPassword',
            consts.error.errorTextEmptyField
        ),
        Input(
            consts.profilePage.newPassword,
            'password',
            'newPasswordRepeat',
            consts.error.errorTextEmptyField
        ),
    ];
    const arrayButtons = [
        Button(consts.profilePage.buttonSave, 'profile-form__button'),
        Button(consts.profilePage.buttonChange, 'profile-form__button'),
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
                        {Form('profile__form', arrayInputs, arrayButtons)}
                    </div>
                </div>
            </main>
        </div>
    );
}
