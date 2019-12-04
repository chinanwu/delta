import { shallow } from 'enzyme';
import React from 'react';

import { Settings, mapStateToProps } from '../../components/Settings.jsx';

jest.unmock('../../components/Settings.jsx');

describe('Settings component', () => {
	describe('rendering', () => {
		it('renders Settings', () => {
			const wrapper = shallow(<Settings />);
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
