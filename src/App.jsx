import React, { useCallback } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { store } from './store';

import './App.less';
import Game from './components/Game.jsx';
import Home from './components/Home.jsx';
import NotFound from './components/NotFound.jsx';

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/game/:gameUrl(/^[a-z]+$/i)" component={Game} />
					<Route component={NotFound} />
				</Switch>
			</Router>
		</Provider>
	);
};

export default App;
