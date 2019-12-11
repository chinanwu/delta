import { editGameUrl } from '../actions/GameActions';

export const applyGameUrl = gameUrl => dispatch =>
	dispatch(editGameUrl(gameUrl));
