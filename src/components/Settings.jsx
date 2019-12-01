import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import getThemeClassname from '../functions/getThemeClassname';

import { applyTheme } from '../thunk/ThemeThunk.jsx';

import './Settings.less';

export const Settings = ({ dark, onToggle }) => {
	useEffect(() => {
		document.title = 'Settings - Mairead';
	}, []);

	const handleChange = useCallback(
		event => {
			onToggle(event.target.checked);
		},
		[onToggle]
	);

	return (
		<div className={getThemeClassname('Settings', dark)}>
			<div className="Settings__nav" role="navigation">
				<Link className={getThemeClassname('Settings__navBtn', dark)} to="/">
					Home
				</Link>
				<Link
					className={getThemeClassname('Settings__navBtn', dark)}
					to="/about"
				>
					About
				</Link>
				<Link
					className={getThemeClassname('Settings__navBtn--disabled', dark)}
					to="/settings"
				>
					Settings
				</Link>
			</div>
			<div className="Settings__header">Settings</div>
			<div className="Settings__options">
				<div className="Settings__option">
					<div className="Settings__label">Dark Theme:</div>
					<label className="Settings_toggle">
						<input
							type="checkbox"
							onChange={handleChange}
							checked={dark}
							aria-checked={dark}
						/>
						<span
							className={getThemeClassname('Settings_toggleSlider', dark)}
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
