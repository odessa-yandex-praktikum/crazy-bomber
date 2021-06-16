import React from 'react';
import renderer from 'react-test-renderer';
import {Navigation} from './index';

jest.mock('react-router-dom', () => {
    return {
        Link: () => <div>this is mock</div>,
    };
});

it('renders correctly', () => {
    const navigationItems = ['start'];
    const tree = renderer.create(<Navigation navigationItems={navigationItems} />).toJSON();
    expect(tree).toMatchSnapshot();
});
