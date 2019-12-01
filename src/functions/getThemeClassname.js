export default (className, theme) =>
	className + (theme ? ` ${className}--dark` : '');
