import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { store } from './store';

import './App.less';
import About from './components/About.jsx';
import Game from './components/Game.jsx';
import Home from './components/Home.jsx';
import NotFound from './components/NotFound.jsx';

const App = () => (
	<Provider store={store}>
		<Router>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/game/:gameUrl([a-zA-Z]+)" component={Game} />
				<Route exact path="/about" component={About} />
				<Route component={NotFound} />
			</Switch>
		</Router>
	</Provider>
);

export default App;
