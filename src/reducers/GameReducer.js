import { handleActions } from 'redux-actions';

import { editGameUrl } from '../actions/GameActions';

export const defaultState = {
	gameUrl: null,
};

export default handleActions(
	{
		[editGameUrl]: (state, { payload }) => ({
			...state,
			gameUrl: payload,
		}),
	},
	defaultState
);
