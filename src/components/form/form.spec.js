import React from 'react';
import renderer from 'react-test-renderer';
import {Form} from './index';

it('renders correctly', () => {
    const tree = renderer
        .create(
            <Form
                classForm={`form__theme-${theme}`}
                arrayInputs={[<input />]}
                arrayButtons={[<button />, <button />]}
            />
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
