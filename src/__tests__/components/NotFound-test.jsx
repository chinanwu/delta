import { shallow } from 'enzyme';
import React from 'react';

import { NotFound } from '../../components/NotFound.jsx';

jest.unmock('../../components/NotFound.jsx');

describe('NotFound component', () => {
	describe('rendering', () => {
		it('renders NavBar', () => {
			const wrapper = shallow(<NotFound />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
