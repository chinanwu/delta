import { shallow } from 'enzyme';
import React from 'react';

import { Home, mapStateToProps } from '../../components/Home.jsx';

jest.unmock('../../components/Home.jsx');

describe('Home component', () => {
	describe('rendering', () => {
		it('renders Home', () => {
			const wrapper = shallow(<Home />);
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
