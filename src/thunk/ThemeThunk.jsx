import { editTheme } from '../actions/ThemeActions';

export const applyTheme = theme => dispatch =>
	typeof theme === 'boolean' ? dispatch(editTheme(theme)) : null;
