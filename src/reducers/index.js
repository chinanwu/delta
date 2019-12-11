import { combineReducers } from 'redux';

import theme from './ThemeReducer';
import game from './GameReducer';

const rootReducer = combineReducers({ theme, game });

export default rootReducer;
