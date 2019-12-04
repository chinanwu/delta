import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import getThemeClassname from '../functions/getThemeClassname';

import './About.less';
import NavBar from './NavBar.jsx';

export const About = ({ dark }) => {
	useEffect(() => {
		document.title = 'About - Mairead';
	}, []);

	return (
		<div className={getThemeClassname('About', dark)}>
			<NavBar activeTab="about" />
			<div className="About__header" role="heading" aria-level="1">
				About
			</div>
			<div id="aboutRulesLabel" className="About__label" aria-level="2">
				Rules
			</div>
			<div
				className="About__content"
				role="document"
				tabIndex="0"
				aria-labelledby="aboutRulesLabel"
				aria-level="3"
			>
				In each game, you are given two words, a "from" word and a "to" word.
				Starting from the "from" word, one letter is changed at a time until the
				word becomes the "to" word. However, each time a letter is swapped out,
				the resulting new word must still be a valid four-letter word in the
				English language.
			</div>
			<div id="aboutExampleLabel" className="About__label" aria-level="2">
				Example
			</div>
			<div
				className="About__content"
				role="document"
				tabIndex="0"
				aria-labelledby="aboutExampleLabel"
				aria-level="3"
			>
				From: "heat" -> To: "cold"
				<div role="list" aria-level="4">
					{['heat', 'head', 'held', 'hold', 'cold'].map(word => (
						<div key={word} role="listitem" aria-level="4">
							{word}
						</div>
					))}
				</div>
			</div>
			<div id="aboutThankYouLabel" className="About__label" aria-level="2">
				Big thank you to M.C.S.
			</div>
			<div
				className="About__content"
				role="document"
				tabIndex="0"
				aria-labelledby="aboutThankYouLabel"
				aria-level="3"
			>
				Originator of Mairead, the game
			</div>
		</div>
	);
};

About.propTypes = {
	dark: PropTypes.bool,
};

export const mapStateToProps = ({ theme }) => ({
	dark: theme.dark,
});

export default connect(mapStateToProps)(About);
