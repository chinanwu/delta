import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import { enterBtn } from '../constants/Keycodes';
import { getFetch } from '../functions/FetchFunctions';
import getThemeClassname from '../functions/getThemeClassname';
import hasValidCharacters from '../functions/hasValidCharacters';
import isOneOff from '../functions/isOneOff';
import { applyGameUrl } from '../thunk/GameThunk.jsx';

import './Game.less';
import Chat from './Chat.jsx';
import GameInput from './GameInput.jsx';

const URL = 'http://127.0.0.1:5000';
const socket = io(URL);

export const Game = ({
	match: {
		params: { gameUrl },
	},
	dark,
	onJoin,
}) => {
	const [from, setFrom] = useState(
		sessionStorage.getItem(gameUrl + '-from') || null
	);
	const [to, setTo] = useState(sessionStorage.getItem(gameUrl + '-to') || null);
	const [entries, setEntries] = useState([]);
	const [text, setText] = useState('');
	const [error, setError] = useState(null);
	const [win, setWin] = useState(false);
	const [messages, setMessages] = useState([]);
	const [messageText, setMessageText] = useState('');

	useEffect(() => {
		document.title = `Game - ${document.title}`;
		onJoin(gameUrl);
	}, []);

	useEffect(() => {
		getFetch('/api/games/getOrCreate/' + gameUrl).then(res => {
			if (res.success) {
				setFrom(res.data.from);
				sessionStorage.setItem(gameUrl + '-from', res.data.from);
				setEntries([res.data.from]);

				setTo(res.data.to);
				sessionStorage.setItem(gameUrl + '-to', res.data.to);
				socket.emit('room:join', { room: gameUrl });
			}
		});

		socket.on('words:change', data => {
			setFrom(data.from);
			sessionStorage.setItem(gameUrl + '-from', data.from);
			setEntries([data.from]);

			setTo(data.to);
			sessionStorage.setItem(gameUrl + '-to', data.to);
		});
	}, [setFrom, setEntries, setTo]);

	useEffect(() => {
		socket.on('chat:message', data =>
			setMessages(messages => [...messages, data.message])
		);
	}, [setMessages]);

	useEffect(() => {
		if (win) {
			socket.emit('game:win', { room: gameUrl });
		}
	}, [win]);

	const handleChange = useCallback(
		event => {
			if (event && event.target) {
				const value = event.target.value;
				value
					? (setText(value),
					  hasValidCharacters(value)
							? setError(null)
							: setError('Invalid word'))
					: setText('');
			}
		},
		[setText, setError]
	);

	const handleKeyDown = useCallback(
		event => {
			if (event && event.target && event.keyCode) {
				if (event.keyCode === 13 || event.keyCode === 32) {
					handleClick();
				}
			}
		},
		[text, error]
	);

	const handleClick = useCallback(() => {
		getFetch('/api/words/validate?word=' + text).then(res => {
			if (res && isOneOff(entries[entries.length - 1], text)) {
				setEntries(entries => (entries === [] ? [text] : [...entries, text]));
				setText('');
				setError(null);
				text === to ? setWin(true) : setWin(false);
			} else {
				setError('Invalid word');
			}
		});
	}, [setEntries, setText, setWin, text, error]);

	const handleClearClick = useCallback(() => {
		setEntries([from]);
		setText('');
	}, [setEntries, from]);

	const handleNewClick = useCallback(() => {
		getFetch('/api/games/' + gameUrl + '/new').then(res => {
			const from = res.data.from;
			const to = res.data.to;

			setFrom(from);
			sessionStorage.setItem(gameUrl + '-from', from);
			setEntries([from]);

			setTo(to);
			sessionStorage.setItem(gameUrl + '-to', to);

			setWin(false);
			socket.emit('words:change', { room: gameUrl, from: from, to: to });
		});
	}, [setFrom, setEntries, setTo, setWin]);

	const handleChatChange = useCallback(
		event => {
			if (event && event.target) {
				const value = event.target.value;
				value ? setMessageText(value) : setMessageText('');
			}
		},
		[setMessageText]
	);

	const handleChatKeyDown = useCallback(
		event => {
			if (
				!event.shiftKey &&
				!event.ctrlKey &&
				!event.altKey &&
				!event.metaKey
			) {
				if (event.keyCode && event.keyCode === enterBtn) {
					event.preventDefault();
					setMessages(messages => [...messages, 'You: ' + messageText]);
					setMessageText('');
					socket.emit('chat:message', { room: gameUrl, message: messageText });
				}
			}
		},
		[messageText]
	);

	const handleChatClick = useCallback(() => {
		setMessages(messages => [...messages, 'You: ' + messageText]);
		setMessageText('');
		socket.emit('chat:message', { room: gameUrl, message: messageText });
	}, [setMessages, setMessageText, messageText]);

	return (
		<div className={getThemeClassname('Game', dark)}>
			<div className="Game__nav" role="navigation" aria-label="Game">
				<Link className={getThemeClassname('Game__navBtn', dark)} to="/">
					Home
				</Link>
				<Link className={getThemeClassname('Game__navBtn', dark)} to="/about">
					About
				</Link>
				<Link
					className={getThemeClassname('Game__navBtn', dark)}
					to="/settings"
				>
					Settings
				</Link>
			</div>
			<div className="Game__header">
				<div className="Game__words">
					<div className="Game__label">From:</div>
					<div className="Game__word">{from ? from : '...'}</div>
					<div className="Game__label">To: </div>
					<div className="Game__word">{to ? to : '...'}</div>
				</div>
			</div>
			<div className="Game__seed">
				<div>Seed:</div>
				<div>{gameUrl}</div>
			</div>
			<div className="Game__new">
				<button className="Game__newBtn" onClick={handleNewClick}>
					New Game
				</button>
			</div>
			<div className="Game__content">
				<GameInput
					entries={entries}
					text={text}
					error={error}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
					onSubmit={handleClick}
					onClear={handleClearClick}
				/>
				<Chat
					messages={messages}
					text={messageText}
					onChange={handleChatChange}
					onKeyDown={handleChatKeyDown}
					onClick={handleChatClick}
				/>
			</div>
			<div className={win ? 'Game__win' : 'Game__win--hidden'}>You've won!</div>
		</div>
	);
};

Game.propTypes = {
	match: PropTypes.object,
	dark: PropTypes.bool,
	onJoin: PropTypes.func,
};

export const mapStateToProps = ({ theme }) => ({
	dark: theme.dark,
});

const mapDispatchToProps = {
	onJoin: applyGameUrl,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Game);

//<div className="Game__solution">
// 					<div className="Game__history">
// 						{entries.map((entry, index) => (
// 							<div className="Game__historyItem" key={entry + index}>
// 								{entry}
// 							</div>
// 						))}
// 					</div>
// 					<div className="Game__entry">
// 						<div className="Game__entryInputContainer">
// 							<input
// 								className={
// 									'Game__entryInput' + (error ? ' Game__entryInput--error' : '')
// 								}
// 								type="text"
// 								value={text}
// 								maxLength={4}
// 								onChange={handleChange}
// 								onKeyDown={handleKeyDown}
// 							/>
// 							<button className="Game__submitBtn" onClick={handleClick}>
// 								Submit
// 							</button>
// 						</div>
// 					</div>
// 					<button
// 						className="Game__historyClear"
// 						title="Clear history"
// 						onClick={handleClearClick}
// 					>
// 						x
// 					</button>
// 				</div>
