import React from 'react';
import renderer from 'react-test-renderer';
import {Input} from './index';

it('renders correctly', () => {
    const tree = renderer.create(<Input nameField="" textError="" />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders correctly with InputHTMLAttributes', () => {
    const tree = renderer
        .create(<Input nameField="name" textError="error name" value="123" border="2" />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
