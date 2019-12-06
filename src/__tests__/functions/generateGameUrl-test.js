import generateGameUrl from '../../functions/generateGameUrl';

jest.unmock('../../functions/generateGameUrl.js');

describe('generateGameUrl function', () => {
	it('generates a random four letter sequence', () => {
		const url = generateGameUrl();
		expect(typeof url === 'string').toBeTruthy();
		expect(url.length).toEqual(4);
	});
});
