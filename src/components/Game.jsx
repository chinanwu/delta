import React, { useCallback, useEffect, useState } from 'react';

import { getFetch, postFetch } from '../functions/FetchFunctions';
import hasValidCharacters from '../functions/hasValidCharacters';

import './Game.less';

export const Game = ({
	match: {
		params: { gameUrl },
	},
}) => {
	const [from, setFrom] = useState(
		sessionStorage.getItem(gameUrl + '-from') || null
	);
	const [to, setTo] = useState(sessionStorage.getItem(gameUrl + '-to') || null);
	const [entries, setEntries] = useState([]);
	const [text, setText] = useState('');
	const [error, setError] = useState(null);

	useEffect(() => {
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
	}, []);

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
					getFetch(
						'http://localhost:5000/api/words/validate?word=' + text
					).then(res => {
						res
							? text.length === 4 && error === null
								? setEntries(entries => {
										if (entries === []) {
											return [text];
										} else {
											return [...entries, text];
										}
								  })
								: null
							: setError('Invalid word');
					});
				}
			}
		},
		[text, error]
	);

	const handleClick = useCallback(() => {
		getFetch('http://localhost:5000/api/words/validate?word=' + text).then(
			res => {
				res
					? text.length === 4 && error === null
						? setEntries(entries => {
								if (entries === []) {
									return [text];
								} else {
									return [...entries, text];
								}
						  })
						: null
					: setError('Invalid word');
			}
		);
	}, [text, error]);

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
			<div className="Game__solution">
				<div className="Game__history">
					{entries.map((entry, index) => (
						<div key={entry + index}>{entry}</div>
					))}
				</div>
				<div className="Game__entry">
					<div className="Game__entryInputContainer">
						<input
							className={
								'Game__entryInput' + (error ? ' Game__entryInput--error' : '')
							}
							type="text"
							value={text}
							maxLength={4}
							onChange={handleChange}
							onKeyDown={handleKeyDown}
						/>
					</div>
					<button className="Game__btn" onClick={handleClick}>
						Submit
					</button>
				</div>
				<button className="Game__historyClear">x</button>
			</div>
		</div>
	);
};

export default Game;

// TODO
// Not allow dupes in entries
// Enforce 4 letters in entry
