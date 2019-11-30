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
			<div className="HomeHeader">Mairead</div>
			<div>
				<div className="HomeGame">
					<input
						id="homeInput"
						className={'HomeInput' + (error ? ' HomeInput--error' : '')}
						type="text"
						name="gameUrl"
						value={gameUrl}
						onChange={handleChange}
					/>
					<button
						className={'HomeBtn' + (error ? ' HomeBtn--error' : '')}
						disabled={!!error}
						onClick={handleCreateClick}
					>
						Create
					</button>
				</div>
				<div className="HomeError">{error}</div>
			</div>
			<div className="HomeFooter">
				Made with love by{' '}
				<a href="https://www.github.com/chinanwu">Chin-An Wu</a>
			</div>
		</div>
	);
};

export default Home;
