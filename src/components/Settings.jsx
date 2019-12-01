import React from 'react';

import './Settings.less';

export const Settings = () => (
	<div className="Settings">
		<div className="Settings__nav" role="navigation">
			<a className="Settings__navBtn" href="/">
				Home
			</a>
			<a className="Settings__navBtn" href="/about">
				About
			</a>
		</div>
		<div className="Settings__header">Settings</div>
	</div>
);
export default Settings;
