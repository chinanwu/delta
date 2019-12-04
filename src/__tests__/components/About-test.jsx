import { shallow } from 'enzyme';
import React from 'react';

import { About, mapStateToProps } from '../../components/About.jsx';

jest.unmock('../../components/About.jsx');

describe('About component', () => {
	describe('rendering', () => {
		it('renders About', () => {
			const wrapper = shallow(<About />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('mapStateToProps', () => {
		it('returned mapped properties', () => {
			const theme = { dark: true };
			const state = { theme };
			expect(mapStateToProps(state)).toEqual(theme);
		});
	});
});
