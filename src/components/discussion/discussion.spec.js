import React from 'react';
import renderer from 'react-test-renderer';
import {discussions} from '../../testdata/ForumData';
import {DiscussionItem} from './index';

jest.mock('react-router-dom', () => {
    return {
        Link: () => <div>this is mock</div>,
    };
});

it('renders correctly', () => {
    const tree = renderer
        .create(<DiscussionItem discussion={discussions[1]} key={discussions[1].id} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
