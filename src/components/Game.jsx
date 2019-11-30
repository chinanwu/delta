import React, { useEffect } from 'react';
import { getFetch, postFetch } from '../functions/FetchFunctions';

export const Game = ({ match }) => {
	useEffect(() => {
		const url = match.params.gameUrl;
		getFetch('http://localhost:5000/api/games/' + url).then(res => {
			if (!res.success) {
				postFetch(
					'http://localhost:5000/api/games/create',
					JSON.stringify({ url: url })
				).then(res => {
					console.log(res);
				});
			}
		});
	}, []);

	return <div>Game Room</div>;
};

export default Game;
