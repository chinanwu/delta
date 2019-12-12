import { shallow } from 'enzyme';
import React from 'react';

import { Chat } from '../../components/Chat.jsx';

jest.unmock('../../components/Chat.jsx');

describe('Chat component', () => {
	describe('rendering', () => {
		it('renders', () => {
			const wrapper = shallow(<Chat messages={['test']} />);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('behaviour', () => {
		it('calls onChange when input changes', () => {
			const onChange = jest.fn();
			const wrapper = shallow(<Chat messages={[]} onChange={onChange} />);
			wrapper.find('#chatInput').simulate('change');
			expect(onChange).toHaveBeenCalled();
		});

		it('calls onKeyDown when key down', () => {
			const onKeyDown = jest.fn();
			const wrapper = shallow(<Chat messages={[]} onKeyDown={onKeyDown} />);
			wrapper.find('#chatInput').simulate('keydown');
			expect(onKeyDown).toHaveBeenCalled();
		});

		it('calls onClick when click on button', () => {
			const onClick = jest.fn();
			const wrapper = shallow(<Chat messages={[]} onClick={onClick} />);
			wrapper.find('#chatInputBtn').simulate('click');
			expect(onClick).toHaveBeenCalled();
		});
	});
});
