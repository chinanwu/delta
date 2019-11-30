import React, { useCallback, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { postFetch } from '../functions/FetchFunctions';
import generateGameUrl from '../functions/generateGameUrl';

import './Home.less';

const REGEX = /^[a-z]+$/i;

export const Home = ({}) => {
	const [gameUrl, setGameUrl] = useState(generateGameUrl);
	const [error, setError] = useState(null);
	const [redirect, setRedirect] = useState(false);

	const handleChange = useCallback(event => {
		if (event && event.target) {
			if (event.target.value) {
				const url = event.target.value;
				setGameUrl(url);
				!REGEX.test(url)
					? setError('Game URL must only contain letters')
					: setError(null);
			} else {
				setGameUrl('');
				setError('Game URL cannot be empty');
			}
		}
	}, []);

	const handleCreateClick = useCallback(() => {
		if (!error) {
			postFetch(
				'http://localhost:5000/api/games/create',
				JSON.stringify({ url: gameUrl })
			).then(res => {
				console.log('Creating game: ' + res.success);
				if (res.success) {
					setRedirect(true);
				}
			});
		}
	}, []);

	return redirect ? (
		<Redirect to={'/game/' + gameUrl} />
	) : (
		<div className="Home">
			<div className="Home__header">Mairead</div>
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
						className={'home__btn' + (error ? ' home__btn--error' : '')}
						disabled={!!error}
						onClick={handleCreateClick}
					>
						Create
					</button>
				</div>
				<div className="Home__error">{error}</div>
			</div>
			<div className="Home__footer">
				Made with love by{' '}
				<a href="https://www.github.com/chinanwu">Chin-An Wu</a>
			</div>
		</div>
	);
};

export default Home;
