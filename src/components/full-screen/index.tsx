import * as React from 'react';
import {FC, useCallback, useState} from 'react';
import './full-screen.css';
import {consts} from '../../consts';
import {getBrowserDocument} from '../../utils/Utils';
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
    const document = getBrowserDocument();

    const [type, setType] = useState(() => {
        if (document?.fullscreenElement) {
            return EButtonType.EXIT_FULL_SCREEN;
        } else {
            return EButtonType.FULL_SCREEN;
        }
    });
    const onFullScreenClick = useCallback(function () {
        if (document?.fullscreenElement) {
            document.exitFullscreen?.();
            setType(EButtonType.FULL_SCREEN);
        } else {
            document?.documentElement?.requestFullscreen();
            setType(EButtonType.EXIT_FULL_SCREEN);
        }
    }, []);
    return (
        <div className={`full-screen ${getFullScreenClass(position)}`}>
            <Button
                key={consts.profilePage.buttonSaveChanges}
                buttonType={type || EButtonType.FULL_SCREEN}
                onClick={onFullScreenClick}
            />
        </div>
    );
};

function getFullScreenClass(position: EFullScreenPosition): string {
    switch (position) {
        case EFullScreenPosition.RIGHT_BOTTOM: {
            return 'full-screen__right-bottom';
        }
        case EFullScreenPosition.RIGHT_TOP:
        default: {
            return 'full-screen__right-top';
        }
    }
}
