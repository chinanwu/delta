import React from 'react';
import PropTypes from 'prop-types';

import './GameInput.less';

export const GameInput = ({
	entries,
	error,
	text,
	onChange,
	onKeyDown,
	onSubmit,
	onClear,
}) => (
	<div className="GameInput">
		<div className="GameInput__history">
			{entries.map((entry, index) => (
				<div className="GameInput__historyItem" key={entry + index}>
					{entry}
				</div>
			))}
		</div>
		<div className="GameInput__entry">
			<div className="GameInput__entryInputContainer">
				<input
					className={
						'GameInput__entryInput' +
						(error ? ' GameInput__entryInput--error' : '')
					}
					type="text"
					value={text}
					maxLength={4}
					onChange={onChange}
					onKeyDown={onKeyDown}
				/>
				<button className="GameInput__submitBtn" onClick={onSubmit}>
					Submit
				</button>
			</div>
		</div>
		<button
			className="Game__historyClear"
			title="Clear history"
			onClick={onClear}
		>
			x
		</button>
	</div>
);

GameInput.propTypes = {
	entries: PropTypes.array,
	error: PropTypes.string,
	text: PropTypes.string,
	onChange: PropTypes.func,
	onKeyDown: PropTypes.func,
	onSubmit: PropTypes.func,
	onClear: PropTypes.func,
};

export default GameInput;
