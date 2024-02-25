import { pick, exclude, toArray } from './utils';

describe('utils', () => {
   it('exclude util', () => {
      const result = exclude({ one: '1', two: '2', tree: '3' }, ['one']);
      expect(result).toEqual({ two: '2', tree: '3' });
   });

   it('pick util', () => {
      const result = pick({ one: '1', two: '2', tree: '3' }, ['one', 'tree']);
      expect(result).toEqual({ one: '1', tree: '3' });
   });

   it('toArray util', () => {
      const result = toArray('one');
      expect(result).toEqual(['one']);
   });
});
