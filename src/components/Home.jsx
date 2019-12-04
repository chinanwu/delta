import React, { useCallback, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { postFetch } from '../functions/FetchFunctions';
import generateGameUrl from '../functions/generateGameUrl';
import getThemeClassname from '../functions/getThemeClassname';
import hasValidCharacters from '../functions/hasValidCharacters';

import './Home.less';
import NavBar from './NavBar.jsx';

export const Home = ({ dark }) => {
	const [gameUrl, setGameUrl] = useState(generateGameUrl);
	const [error, setError] = useState(null);
	const [redirect, setRedirect] = useState(false);

	useEffect(() => {
		document.title = `Home - ${document.title}`;
	}, []);

	const handleChange = useCallback(
		event => {
			if (event && event.target) {
				if (event.target.value) {
					const url = event.target.value;
					setGameUrl(url);
					hasValidCharacters(url)
						? setError(null)
						: setError('Game URL must only contain letters');
				} else {
					setGameUrl('');
					setError('Game URL cannot be empty');
				}
			}
		},
		[setGameUrl, setError]
	);

	const handleCreateClick = useCallback(() => {
		!error
			? postFetch(
					'http://localhost:5000/api/games/new',
					JSON.stringify({ url: gameUrl })
			  ).then(res => {
					console.log('Creating game: ' + res.success);
					if (res.success) {
						setRedirect(true);
					}
			  })
			: null;
	}, [error, setRedirect]);

	return redirect ? (
		<Redirect to={'/game/' + gameUrl} />
	) : (
		<div className={getThemeClassname('Home', dark)}>
			<NavBar activeTab="home" />
			<div className="Home__header" role="banner">
				Mairead
			</div>
			<div>
				<div className="Home__game">
					<input
						id="homeInput"
						className={'Home__input' + (error ? ' Home__input--error' : '')}
						type="text"
						name="gameUrl"
						value={gameUrl}
						onChange={handleChange}
					/>
					<button
						className={'Home__btn' + (error ? ' Home__btn--error' : '')}
						disabled={!!error}
						onClick={handleCreateClick}
					>
						Create
					</button>
				</div>
				<div className="Home__error">{error}</div>
			</div>
			<div
				className={getThemeClassname('Home__footer', dark)}
				aria-label="Footer"
			>
				Made with love by{' '}
				<a href="https://www.github.com/chinanwu">Chin-An Wu</a>
			</div>
		</div>
	);
};

Home.propTypes = {
	dark: PropTypes.bool,
};

export const mapStateToProps = ({ theme }) => ({
	dark: theme.dark,
});

export default connect(mapStateToProps)(Home);
