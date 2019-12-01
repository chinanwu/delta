export default (first, second) => {
	const firstArr = first.split('');
	const secondArr = second.split('');

	let same = 0;
	firstArr.map(
		(letter, index) => (same += letter === secondArr[index] ? 1 : 0)
	);

	return same === 3;
};
