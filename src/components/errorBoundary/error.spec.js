import React from 'react';
import renderer from 'react-test-renderer';
import {ErrorBoundary} from './index';

it('renders correctly', () => {
    const tree = renderer.create(<ErrorBoundary key={1} children={<div />} />).toJSON();
    expect(tree).toMatchSnapshot();
});
