import * as React from 'react';
import './profile.css';
import {useCallback, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {BackLink} from '../../components/backLink';
import {Button, EButtonColor, EButtonType} from '../../components/button';
import {Form} from '../../components/form';
import {EFullScreenPosition, FullScreen} from '../../components/full-screen';
import {Input} from '../../components/input';
import {Navigation} from '../../components/navigation';
import {consts} from '../../consts';
import {useInput} from '../../hooks/use-input';
import {EValidationType} from '../../hooks/use-validation';
import {Data} from '../../services/api/user-api';
import {userActions} from '../../store/actions/userActions';
import {useTypedSelector} from '../../store/hooks/useTypedSelector';
import {convertScoreToString} from '../../utils/Utils';

export default function Profile() {
    const pageTitle = consts.profilePage.pageTitle;
    const navLinkStart = consts.navigation.navLinkStart;
    const navLinkForum = consts.navigation.navLinkForum;
    const navLinkLeaderboard = consts.navigation.navLinkLeaderboard;
    const navLinkLogout = consts.navigation.navLinkLogout;

    const dispatch = useDispatch();
    const currentUser = useTypedSelector((state) => state.user.currentUser);
    const errorMessage = useTypedSelector((state) => state.user.error);
    const [changeError, setChangeError] = useState(errorMessage);

    useEffect(() => {
        if (errorMessage) {
            setChangeError(errorMessage);
        }
    }, [errorMessage]);

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
    const onSaveChangesClick = useCallback(() => {
        setChangeError('');
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
            dispatch(userActions.changeProfile(formData));
        }
        if (newPassword.value !== '') {
            dispatch(userActions.changePassword(formData));
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
            <div className="form-error">{changeError}</div>;
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
                                <img src={currentUser.avatar} alt="" />
                                <span className="profile-page__user-name">{currentUser.login}</span>
                            </div>
                            <div>
                                <span className="profile-page__score">
                                    Score: {convertScoreToString(currentUser.score)}
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
            <FullScreen position={EFullScreenPosition.RIGHT_TOP} />
        </div>
    );
}
