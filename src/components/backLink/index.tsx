import * as React from 'react';
import './link.css';
import {useHistory} from 'react-router-dom';
import {consts} from '../../consts';

export default function BackLink() {
    const linkBack = consts.linkBack;
    const history = useHistory();

    return (
        <button className="page-container__backlink" onClick={() => history.goBack()}>
            {linkBack}
        </button>
    );
}
