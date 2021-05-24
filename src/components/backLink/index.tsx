import * as React from 'react';
import './link.css';
import {FC} from 'react';
import {useHistory} from 'react-router-dom';
import {consts} from '../../consts';

export type TBackLinkProps = {
    customClass?: string;
};

type Props = FC<TBackLinkProps>;

export const BackLink: Props = ({customClass}: TBackLinkProps) => {
    const linkBack = consts.linkBack;
    const history = useHistory();

    return (
        <button
            className={customClass ? `backlink ${customClass}` : 'backlink'}
            onClick={() => history.goBack()}
        >
            {linkBack}
        </button>
    );
};
