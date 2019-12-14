import { editGameUrl, editPlayerName } from '../actions/GameActions';

export const applyGameUrl = gameUrl => dispatch =>
	dispatch(editGameUrl(gameUrl));

export const applyPlayerName = playerName => dispatch =>
	dispatch(editPlayerName(playerName));
