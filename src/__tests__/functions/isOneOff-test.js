import isOneOff from '../../functions/isOneOff';

jest.unmock('../../functions/isOneOff.js');

describe('isOneOff function', () => {
	it('returns true if one off', () => {
		expect(isOneOff('abcd', 'abce')).toBeTruthy();
	});

	it('returns false if not one off', () => {
		expect(isOneOff('abcd', 'abef')).toBeFalsy();
		expect(isOneOff('abcd', 'aefg')).toBeFalsy();
		expect(isOneOff('abcd', 'efgh')).toBeFalsy();
		expect(isOneOff('abcd', 'bcda')).toBeFalsy();
	});
});
