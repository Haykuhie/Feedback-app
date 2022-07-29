import { dateFormatter, phoneNumberFormatter } from '../helpers';

describe('helpers', () => {
  describe('dateFormatter', () => {
    it('should format  the given date', () => {
      const response = dateFormatter('2022-04-08T05:55:01.984869+00:00');
      expect(response).toBe('Apr 8, 2022, 09:55');
    });
  });
  describe('phoneNumberFormatter', () => {
    it('should format  the given phone number', () => {
      const response = phoneNumberFormatter('094001122');
      expect(response).toBe('094 001122');
    });
  });
});
