import { shallow } from 'enzyme';
import React from 'react';

import { NavBar, mapStateToProps } from '../../components/NavBar.jsx';

jest.unmock('../../components/NavBar.jsx');

describe('NavBar component', () => {
	describe('rendering', () => {
		it('renders NavBar', () => {
			const wrapper = shallow(<NavBar />);
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
