import {configure} from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {Navigation} from './index';

configure({adapter: new Adapter()});

jest.mock('react-router-dom', () => {
    return {
        Link: () => <div>this is mock</div>,
    };
});

jest.mock('react-redux', () => {
    return {
        useDispatch: () => () => {},
    };
});
it('renders correctly', () => {
    const navigationItems = ['start'];
    const navigation = renderer
        .create(
            <Navigation navigationItems={navigationItems} />
        )
        .toJSON();
    expect(navigation).toMatchSnapshot();
});
