import * as React from 'react';
import {FC, useCallback, useState} from 'react';
import './full-screen.css';
import {consts} from '../../consts';
import {Button, EButtonType} from '../button';

export enum EFullScreenPosition {
    RIGHT_TOP,
    RIGHT_BOTTOM,
}

export type TFullScreenProps = {
    position: EFullScreenPosition;
};

type Props = FC<TFullScreenProps>;

export const FullScreen: Props = ({position}: TFullScreenProps) => {
    const [type, setType] = useState(() => {
        if (document.fullscreenElement) {
            return EButtonType.EXIT_FULL_SCREEN;
        } else {
            return EButtonType.FULL_SCREEN;
        }
    });
    const onFullScreenClick = useCallback(function () {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setType(EButtonType.EXIT_FULL_SCREEN);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            setType(EButtonType.FULL_SCREEN);
        }
    }, []);
    return (
        <div className={`${getFullScreenClass(position)}`}>
            <Button
                key={consts.profilePage.buttonSaveChanges}
                buttonType={type}
                onClick={onFullScreenClick}
            />
        </div>
    );
};

function getFullScreenClass(position: EFullScreenPosition): string {
    let cssString = 'full-screen';
    switch (position) {
        case EFullScreenPosition.RIGHT_BOTTOM: {
            cssString += ' full-screen__right-bottom';
            break;
        }
        case EFullScreenPosition.RIGHT_TOP: {
            cssString += ' full-screen__right-top';
            break;
        }
    }
    return cssString;
}
