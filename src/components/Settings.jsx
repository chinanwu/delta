import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getThemeClassname from '../functions/getThemeClassname';

import { applyTheme } from '../thunk/ThemeThunk.jsx';

import './Settings.less';
import NavBar from './NavBar.jsx';

export const Settings = ({ dark, onToggle }) => {
	useEffect(() => {
		document.title = `Settings - ${document.title}`;
	}, []);

	const handleChange = useCallback(
		event => {
			onToggle(event.target.checked);
		},
		[onToggle]
	);

	return (
		<div className={getThemeClassname('Settings', dark)}>
			<NavBar activeTab="settings" />
			<div className="Settings__header">Settings</div>
			<div className="Settings__options">
				<div className="Settings__option">
					<div className="Settings__label">Dark Theme:</div>
					<label className="Settings__toggle">
						<input
							type="checkbox"
							onChange={handleChange}
							checked={dark}
							aria-checked={dark}
						/>
						<span
							className={getThemeClassname('Settings__toggleSlider', dark)}
						/>
					</label>
				</div>
			</div>
		</div>
	);
};

Settings.propTypes = {
	dark: PropTypes.bool,
};

export const mapStateToProps = ({ theme }) => ({
	dark: theme.dark,
});

export const mapDispatchToProps = {
	onToggle: applyTheme,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Settings);
