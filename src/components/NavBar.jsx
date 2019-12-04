import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import getThemeClassname from '../functions/getThemeClassname';

import './NavBar.less';

const getClassName = (tab, active, dark) =>
	getThemeClassname(
		tab === active ? 'NavBar__btn--disabled' : 'NavBar__btn',
		dark
	);

export const NavBar = ({ activeTab, dark }) => (
	<div className="NavBar" role="navigation" aria-label="Game">
		<Link className={getClassName('home', activeTab, dark)} to="/">
			Home
		</Link>
		<Link className={getClassName('about', activeTab, dark)} to="/about">
			About
		</Link>
		<Link className={getClassName('settings', activeTab, dark)} to="/settings">
			Settings
		</Link>
	</div>
);

NavBar.propTypes = {
	activeTab: PropTypes.string,
	dark: PropTypes.bool,
};

export const mapStateToProps = ({ theme }) => ({
	dark: theme.dark,
});

export default connect(mapStateToProps)(NavBar);
