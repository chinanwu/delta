import { handleActions } from 'redux-actions';

import {
	editGameUrl,
	editPlayerName,
	initializeGame,
} from '../actions/GameActions';

export const defaultState = {
	gameUrl: null,
	playerName: null,
};

export default handleActions(
	{
		[editGameUrl]: (state, { payload }) => ({
			...state,
			gameUrl: payload,
		}),
		[editPlayerName]: (state, { payload }) => ({
			...state,
			playerName: payload,
		}),
	},
	defaultState
);
