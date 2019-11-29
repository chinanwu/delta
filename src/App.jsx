import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { store } from './store';

import './App.less';
import Game from './components/Game.jsx';
import Home from './components/Home.jsx';
import NotFound from './components/NotFound.jsx';

const App = () => (
	<Provider store={store}>
		<Router>
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route exact path="/game/:gameUrl">
					<Game />
				</Route>
				<Route>
					<NotFound />
				</Route>
			</Switch>
		</Router>
	</Provider>
);

export default App;
