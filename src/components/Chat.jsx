import React from 'react';
import PropTypes from 'prop-types';

import './Chat.less';

export const Chat = ({ messages, text, onChange, onKeyDown, onClick }) => (
	<div className="Chat">
		<div className="Chat__messages">
			{messages.map((message, index) => (
				<div key={index}>{message}</div>
			))}
		</div>
		<div className="Chat__inputBar">
			<input
				className="Chat__input"
				type="text"
				value={text}
				onChange={onChange}
				onKeyDown={onKeyDown}
			/>
			<button className="Chat__inputBtn" onClick={onClick}>
				Submit
			</button>
		</div>
	</div>
);

Chat.propTypes = {
	messages: PropTypes.array,
	text: PropTypes.string,
	onChange: PropTypes.func,
	onKeyDown: PropTypes.func,
	onClick: PropTypes.func,
};
export default Chat;
