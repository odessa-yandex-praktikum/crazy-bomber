import * as React from 'react';
import './profile.css';
import BackLink from '../../components/backLink';
import {Button, EButtonColor, EButtonType} from '../../components/button';
import {Form} from '../../components/form';
import {Input} from '../../components/input';
import {Navi, TNaviItem} from '../../components/navi';
import {consts} from '../../consts';
import {createNaviPath} from '../../utils/Utils';

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
            buttonColor={EButtonColor.PRIMARY}
            buttonType={EButtonType.PROFILE_FORM}
        />,
        <Button
            key={consts.profilePage.buttonChange}
            text={consts.profilePage.buttonChange}
            buttonColor={EButtonColor.PRIMARY}
            buttonType={EButtonType.PROFILE_FORM}
        />,
    ];

    const arrayNaviItems = [
        new TNaviItem(navLinkStart, createNaviPath(navLinkStart)),
        new TNaviItem(navLinkForum, createNaviPath(navLinkForum)),
        new TNaviItem(navLinkLeaderboard, createNaviPath(navLinkLeaderboard)),
        new TNaviItem(navLinkLogout, createNaviPath(navLinkLogout)),
    ];

    return (
        <div className="profile-page profile-page__background">
            <div className="container__left-part">
                <Navi arrayNaviItems={arrayNaviItems} />
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
