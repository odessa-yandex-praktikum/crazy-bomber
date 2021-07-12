import React from 'react';
import renderer from 'react-test-renderer';
import {BackLink} from './index';

it('renders correctly', () => {
    const tree = renderer.create(<BackLink />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders correctly on error page', () => {
    const tree = renderer.create(<BackLink customClass="error-page__back-link" />).toJSON();
    expect(tree).toMatchSnapshot();
});
