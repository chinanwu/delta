import getThemeClassname from '../../functions/getThemeClassname';

jest.unmock('../../functions/getThemeClassname.js');

describe('getThemeClassname function', () => {
	it('returns classname with theme', () => {
		expect(getThemeClassname('Test', false)).toEqual('Test');
		expect(getThemeClassname('Test', true)).toEqual('Test Test--dark');
	});
});
