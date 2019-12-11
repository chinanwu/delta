import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import getThemeClassname from '../functions/getThemeClassname';

import './Game.less';

const socket = io('http://localhost:5000');

export const Game = ({
	match: {
		params: { gameUrl },
	},
	dark,
}) => {
	const [joined, setJoined] = useState(false);
	const [socketMsg, setSocketMsg] = useState('');

	useEffect(() => {
		document.title = `Game - ${document.title}`;

		socket.emit('game:join', { room: gameUrl });
		socket.on('connect', () => {
			setJoined(true);
		});
		socket.on('words:change', data => {
			console.log('words changed');
			setSocketMsg('changed words: ' + data);
		});

		return () => {
			socket.emit('game:leave', { room: gameUrl });
		};
	}, []);

	const handleClick = useCallback(() => {
		socket.emit('words:change', { room: gameUrl, from: 'word', to: 'test' });
	});

	return (
		<div className={getThemeClassname('Game', dark)}>
			<div>{`has joined: ${joined}`}</div>
			<div>{`socket message: ${socketMsg}`}</div>
			<button onClick={handleClick}>Change</button>
		</div>
	);
};

Game.propTypes = {
	match: PropTypes.object,
	dark: PropTypes.bool,
};

export const mapStateToProps = ({ theme }) => ({
	dark: theme.dark,
});

export default connect(mapStateToProps)(Game);
