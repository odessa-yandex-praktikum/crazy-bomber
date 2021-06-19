import React from 'react';
import renderer from 'react-test-renderer';
import {MessageItem} from './index';

it('renders correctly', () => {
    const message = {
        message: 'Hello, World',
        author: 'Admin',
        created: Date.parse('Sun, 16 May 2021 15:43:00'),
    };
    const tree = renderer.create(<MessageItem message={message} key={message.created} />).toJSON();
    expect(tree).toMatchSnapshot();
});
