import React from 'react';

import './About.less';

export const About = () => (
	<div className="About">
		<div className="About__nav">
			<a className="About__home" href="/">
				Home
			</a>
		</div>
		<div className="About__header">About</div>
		<div className="About__label">Rules</div>
		<div className="About__content">
			In each game, you are given two words, a "from" word and a "to" word.
			Starting from the "from" word, one letter is changed at a time until the
			word becomes the "to" word. However, each time a letter is swapped out,
			the resulting new word must still be a valid four-letter word in the
			English language.
		</div>
		<div className="About__label">Example</div>
		<div className="About__content">
			From: "heat" -> To: "cold"
			{['heat', 'head', 'held', 'hold', 'cold'].map(word => (
				<div>{word}</div>
			))}
		</div>
		<div className="About__label">Big thank you to M.C.S.</div>
		<div className="About__content">Originator of game</div>
	</div>
);

export default About;
