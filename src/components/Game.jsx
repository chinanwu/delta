import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getFetch, postFetch } from '../functions/FetchFunctions';
import getThemeClassname from '../functions/getThemeClassname';
import hasValidCharacters from '../functions/hasValidCharacters';

import './Game.less';
import isOneOff from '../functions/isOneOff';

export const Game = ({
	match: {
		params: { gameUrl },
	},
	dark,
}) => {
	const [from, setFrom] = useState(
		sessionStorage.getItem(gameUrl + '-from') || null
	);
	const [to, setTo] = useState(sessionStorage.getItem(gameUrl + '-to') || null);
	const [entries, setEntries] = useState([]);
	const [text, setText] = useState('');
	const [error, setError] = useState(null);
	const [win, setWin] = useState(false);

	useEffect(() => {
		document.title = 'Game - Mairead';
		getFetch('http://localhost:5000/api/games/' + gameUrl).then(res => {
			if (!res.success) {
				postFetch(
					'http://localhost:5000/api/games/create',
					JSON.stringify({ url: gameUrl })
				).then(res => {
					console.log('Game created in Game page, setting data');
					setFrom(res.data.from);
					sessionStorage.setItem(gameUrl + '-from', res.data.from);
					setEntries([res.data.from]);
					setTo(res.data.to);
					sessionStorage.setItem(gameUrl + '-to', res.data.to);
				});
			} else {
				console.log('Game exists, setting data');
				setFrom(res.data.from);
				sessionStorage.setItem(gameUrl + '-from', res.data.from);
				setEntries([res.data.from]);
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
					handleClick();
				}
			}
		},
		[text, error]
	);

	const handleClick = useCallback(() => {
		getFetch('http://localhost:5000/api/words/validate?word=' + text).then(
			res => {
				if (res && isOneOff(entries[entries.length - 1], text)) {
					setEntries(entries => {
						if (entries === []) {
							return [text];
						} else {
							return [...entries, text];
						}
					});
					setText('');
					setError(null);
					text === to ? setWin(true) : setWin(false);
				} else {
					setError('Invalid word');
				}
			}
		);
	}, [setEntries, setText, setWin, text, error]);

	const handleClearClick = useCallback(() => {
		setEntries([from]);
		setText('');
	}, [setEntries, from]);

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
			<div className="Game__solution">
				<div className="Game__history">
					{entries.map((entry, index) => (
						<div className="Game__historyItem" key={entry + index}>
							{entry}
						</div>
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
				<button className="Game__historyClear" onClick={handleClearClick}>
					x
				</button>
			</div>
			<div className={win ? 'Game__win' : 'Game__win--hidden'}>You've won!</div>
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
