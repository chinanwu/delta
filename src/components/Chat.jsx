import React from 'react';
import PropTypes from 'prop-types';

import './Chat.less';

export const Chat = ({ messages, text, onChange, onKeyDown, onClick }) => (
	<div className="Chat">
		<div className="Chat__messages">
			{messages.map((message, index) => (
				<div className="Chat__message" key={index}>
					{message}
				</div>
			))}
		</div>
		<div className="Chat__inputBar">
			<input
				id="chatInput"
				className="Chat__input"
				type="text"
				value={text}
				onChange={onChange}
				onKeyDown={onKeyDown}
			/>
			<button id="chatInputBtn" className="Chat__inputBtn" onClick={onClick}>
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
