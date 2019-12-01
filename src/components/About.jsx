import React from 'react';

import './About.less';

export const About = () => (
	<div className="About">
		<div className="About__nav" role="navigation">
			<a className="About__navBtn" href="/">
				Home
			</a>
			<a className="About__navBtn" href="/settings">
				Settings
			</a>
		</div>
		<div className="About__header" role="heading" aria-level="1">
			About
		</div>
		<div id="aboutRulesLabel" className="About__label" aria-level="2">
			Rules
		</div>
		<div
			className="About__content"
			role="document"
			tabindex="0"
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
			tabindex="0"
			aria-labelledby="aboutExampleLabel"
			aria-level="3"
		>
			From: "heat" -> To: "cold"
			<div role="list" aria-level="4">
				{['heat', 'head', 'held', 'hold', 'cold'].map(word => (
					<div role="listitem" aria-level="4">
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
			tabindex="0"
			aria-labelledby="aboutThankYouLabel"
			aria-level="3"
		>
			Originator of Mairead, the game
		</div>
	</div>
);

export default About;
