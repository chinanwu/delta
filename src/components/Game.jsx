import React, { useEffect, useState } from 'react';

import { getFetch, postFetch } from '../functions/FetchFunctions';

import './Game.less';

export const Game = ({ match: { params: gameUrl } }) => {
	const [from, setFrom] = useState(
		sessionStorage.getItem(gameUrl + '-from') || null
	);
	const [to, setTo] = useState(sessionStorage.getItem(gameUrl + '-to') || null);
	const [entries, setEntries] = useState([]);
	const [text, setText] = useState('');

	useEffect(() => {
		if (from === null || to === null) {
			getFetch('http://localhost:5000/api/games/' + gameUrl).then(res => {
				if (!res.success) {
					postFetch(
						'http://localhost:5000/api/games/create',
						JSON.stringify({ url: gameUrl })
					).then(res => {
						console.log('Game created in Game page, setting data');
						setFrom(res.data.from);
						sessionStorage.setItem(gameUrl + '-from', res.data.from);
						setTo(res.data.to);
						sessionStorage.setItem(gameUrl + '-to', res.data.to);
					});
				} else {
					console.log('Game exists, setting data');
					setFrom(res.data.from);
					sessionStorage.setItem(gameUrl + '-from', res.data.from);
					setTo(res.data.to);
					sessionStorage.setItem(gameUrl + '-to', res.data.to);
				}
			});
		}
	}, []);

	return (
		<div className="Game">
			<div className="Game__header">
				<div className="Game__logo">
					<a href="/">Mairead</a>
				</div>
				<div className="Game__words">
					<div className="Game__label">From:</div>
					<div className="Game__word">{from ? from : '...'}</div>
					<div className="Game__label">To: </div>
					<div className="Game__word">{to ? to : '...'}</div>
				</div>
			</div>
			<div className="Game__history">
				<div className="Game__entries">{entries}</div>
				<input className="Game__input" type="text" value={text} />
			</div>
		</div>
	);
};

export default Game;
