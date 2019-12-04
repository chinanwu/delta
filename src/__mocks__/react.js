module.exports = {
	...jest.requireActual('react'),
	useState: jest.fn(v => [v, jest.fn()]),
	useEffect: jest.fn(),
	useRef: jest.fn(current => ({ current })),
};
