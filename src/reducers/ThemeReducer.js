import { handleActions } from 'redux-actions';

import { editTheme } from '../actions/ThemeActions';

export const defaultState = {
	dark: false,
};

export default handleActions(
	{
		[editTheme]: (state, { payload }) => ({
			...state,
			dark: payload,
		}),
	},
	defaultState
);
