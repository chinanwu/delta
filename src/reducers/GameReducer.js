import { handleActions } from 'redux-actions';

import { editGameUrl } from '../actions/GameActions';

export const defaultState = {
	game: null,
};

export default handleActions(
	{
		[editGameUrl]: (state, { payload }) => ({
			...state,
			game: payload,
		}),
	},
	defaultState
);
