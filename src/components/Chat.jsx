import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

import './Chat.less';

const URL = 'http://127.0.0.1:5000';

export const Chat = ({ gameUrl }) => {
	const [messages, setMessages] = useState([]);
	const [messageText, setMessageText] = useState('');

	const handleMessageChange = useCallback(
		event => {
			if (event && event.target) {
				const value = event.target.value;
				value ? setMessageText(value) : setMessageText('');
			}
		},
		[setMessageText]
	);

	const handleMessageClick = useCallback(() => {
		setMessages(messages => [...messages, messageText]);
		setMessageText('');
		const socket = io(URL);
		socket.emit('message', { room: gameUrl, message: messageText });
	}, [setMessages, setMessageText, messageText]);

	return (
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
					value={messageText}
					onChange={handleMessageChange}
				/>
				<button className="Chat__inputBtn" onClick={handleMessageClick}>
					Submit
				</button>
			</div>
		</div>
	);
};

Chat.propTypes = {
	gameUrl: PropTypes.string,
};

export const mapStateToProps = ({ game: gameUrl }) => ({
	gameUrl,
});

export default Chat;
