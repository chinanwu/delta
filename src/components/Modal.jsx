import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import FocusTrap from 'focus-trap-react';

import { enterBtn } from '../constants/Keycodes';

import './Modal.less';

export const Modal = ({ title, btnText, onBtnClick, onCloseModalClick }) => {
	const [text, setText] = useState('');

	const handleChange = useCallback(
		event => {
			if (event && event.target) {
				if (event.target.value) {
					setText(event.target.value);
				} else {
					setText('');
				}
			}
		},
		[setText]
	);

	const handleClick = useCallback(() => {
		onBtnClick(text);
	}, [onBtnClick, text]);

	const handleKeyDown = useCallback(
		event => {
			if (event && event.target) {
				if (
					!event.shiftKey &&
					!event.ctrlKey &&
					!event.altKey &&
					!event.metaKey
				) {
					if (event.keyCode && event.keyCode === enterBtn) {
						event.preventDefault();
						console.log(text);
						onBtnClick(text);
					}
				}
			}
		},
		[onBtnClick, text]
	);

	return (
		<FocusTrap>
			<div
				className="Modal"
				style={{
					left: document.documentElement.clientWidth / 2 - 150,
					top: document.documentElement.clientHeight / 3,
				}}
			>
				<div className="Modal__header">
					<h1 id="modalLabel" className="Modal__label">
						{title}
					</h1>
					<button className="Modal__closeBtn" onClick={onCloseModalClick}>
						X
					</button>
				</div>
				<input
					id="modalInput"
					className="Modal__input"
					type="text"
					value={text}
					aria-labelledby="modalLabel"
					onChange={handleChange}
					onKeyDown={handleKeyDown}
				/>
				<button className="Modal__btn" onClick={handleClick}>
					{btnText}
				</button>
			</div>
		</FocusTrap>
	);
};

Modal.propTypes = {
	title: PropTypes.string,
	btnText: PropTypes.string,
	onBtnClick: PropTypes.func,
	onCloseModalClick: PropTypes.func,
};

export default Modal;
