import React from 'react';

import { configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import sinon from 'sinon';

import { Posts } from './Posts'
import { Navbar, ListGroup, Form, Input, ListGroupItem, Row,Image} from 'react-bootstrap';

describe('<Posts />', () => {
    let wrapper;

    wrapper = shallow(<Posts />);

    it('should find Navbar', () => {
        expect(wrapper.find(Navbar)).toHaveLength(1);
    });


    it('should find columns in c component', () => {
        expect(wrapper.find('.col').every('.col')).toEqual(true);
    });

});
