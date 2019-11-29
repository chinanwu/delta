import React, { useCallback, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { postFetch } from '../functions/FetchFunctions';
import generateGameUrl from '../functions/generateGameUrl';

import './Home.less';

const REGEX = /^[a-z]+$/i;

export const Home = ({}) => {
	const [gameUrl, setGameUrl] = useState(generateGameUrl);
	const [redirect, setRedirect] = useState(false);

	const handleChange = useCallback(event => {
		if (event && event.target) {
			if (event.target.value) {
				const url = event.target.value;
				if (REGEX.test(url)) {
					setGameUrl(url);
				}
			} else {
				setGameUrl('');
			}
		}
	}, []);

	const handleCreateClick = useCallback(() => {
		if (gameUrl !== '') {
			postFetch(
				'http://localhost:5000/api/games/create',
				JSON.stringify({ url: gameUrl })
			).then(res => {
				console.log(res.success);
				if (res.success) {
					setRedirect(true);
				}
			});
		} // TODO present error
	}, []);

	return redirect ? (
		<Redirect to={'/game/' + gameUrl} />
	) : (
		<div className="Home">
			<div className="HomeHeader">Mairead</div>
			<div className="HomeGame">
				<input
					id="homeInput"
					className="HomeInput"
					type="text"
					name="gameUrl"
					value={gameUrl}
					onChange={handleChange}
				/>
				<button className="HomeBtn" onClick={handleCreateClick}>
					Create
				</button>
			</div>
			<div className="HomeFooter">
				Made with love by{' '}
				<a href="https://www.github.com/chinanwu">Chin-An Wu</a>
			</div>
		</div>
	);
};

export default Home;
