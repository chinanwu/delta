import hasValidCharacters from '../../functions/hasValidCharacters';

jest.unmock('../../functions/hasValidCharacters.js');

describe('hasValidCharacters function', () => {
	it('returns true when input contains only letters', () => {
		expect(hasValidCharacters('Test')).toBeTruthy();
	});

	it('returns true when input contains things other than letters', () => {
		expect(hasValidCharacters('Test1')).toBeFalsy();
		expect(hasValidCharacters('Test.')).toBeFalsy();
		expect(hasValidCharacters('Test ')).toBeFalsy();
	});
});
