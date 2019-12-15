import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import getThemeClassname from '../functions/getThemeClassname';

import NavBar from './NavBar';
import './About.less';

export const About = ({ dark }) => {
	useEffect(() => {
		document.title = `About - ${document.title}`;
	}, []);

	return (
		<div className={getThemeClassname('About', dark)}>
			<NavBar activeTab="about" />
			<div className="About__header" role="heading">
				About
			</div>
			<div id="aboutRulesLabel" className="About__label">
				Rules
			</div>
			<div
				className="About__content"
				role="document"
				aria-labelledby="aboutRulesLabel"
			>
				In each game, you are given two words, a "from" word and a "to" word.
				Starting from the "from" word, one letter is changed at a time until the
				word becomes the "to" word. However, each time a letter is swapped out,
				the resulting new word must still be a valid four-letter word in the
				English language.
			</div>
			<div id="aboutExampleLabel" className="About__label">
				Example
			</div>
			<div
				className="About__content"
				role="document"
				aria-labelledby="aboutExampleLabel"
			>
				From: "heat" -> To: "cold"
				<div role="list">
					{['heat', 'head', 'held', 'hold', 'cold'].map(word => (
						<div key={word} role="listitem">
							{word}
						</div>
					))}
				</div>
			</div>
			<div id="aboutThankYouLabel" className="About__label">
				Big thank you to M.C.S.
			</div>
			<div
				className="About__content"
				role="document"
				aria-labelledby="aboutThankYouLabel"
			>
				Originator of Delta
			</div>
		</div>
	);
};

About.propTypes = {
	dark: PropTypes.bool,
};

export const mapStateToProps = ({ theme: { dark } }) => ({
	dark,
});

export default connect(mapStateToProps)(About);
