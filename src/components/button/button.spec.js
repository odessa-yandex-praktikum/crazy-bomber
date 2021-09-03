import React from 'react';
import renderer from 'react-test-renderer';
import {Button, EButtonColor, EButtonType} from './index';
import {configure, shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({adapter: new Adapter()});

it('renders correctly Ok', () => {
    const tree = renderer
        .create(
            <Button
                key={1}
                text="OK"
                buttonColor={EButtonColor.PRIMARY}
                buttonType={EButtonType.FORM}
                onClick={console.log('click')}
            />
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders correctly Error', () => {
    const tree = renderer
        .create(
            <Button
                key={2}
                text="Error"
                buttonColor={EButtonColor.ERROR}
                buttonType={EButtonType.ERROR}
                onClick={console.log('click error')}
            />
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders correctly full screen', () => {
    const tree = renderer
        .create(
            <Button
                key={4}
                text="Full screen"
                buttonColor={EButtonColor.PRIMARY}
                buttonType={EButtonType.FULL_SCREEN}
                onClick={console.log('click full screen')}
            />
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});

it('renders correctly exit full screen', () => {
    const tree = renderer
        .create(
            <Button
                key={5}
                text="Exit full screen"
                buttonColor={EButtonColor.PRIMARY}
                buttonType={EButtonType.EXIT_FULL_SCREEN}
                onClick={console.log('click exit full screen')}
            />
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it('clicks correctly', () => {
    const mockCallBack = jest.fn();
    const button = shallow(
        <Button
            key={6}
            text="OK"
            buttonColor={EButtonColor.PRIMARY}
            buttonType={EButtonType.FORM}
            onClick={mockCallBack}
        />
    );
    button.find('button').simulate('click');
    button.find('button').simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(2);
});
