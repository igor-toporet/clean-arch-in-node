import { Result } from "../src/Result";

describe('Result', () => {
  describe('failure', () => {
    const result = Result.failure<number>('any string');

    it('`isFailure` is true', () => {
      expect(result.isFailure).toBe(true);
    });

    it('`isSuccess` is false', () => {
      expect(result.isSuccess).toBe(false);
    });

    it('`error` is set to the error message passed in', () => {
      expect(result.error).toBe('any string');
    });

    it('`value` throws', () => {
      expect(() => result.value).toThrow(
        'Invalid Operation. Failure result does not have a value.'
      );
    });
  });

  describe('success', () => {
    const result = Result.success(42);

    it('`isFailure` is false', () => {
      expect(result.isFailure).toBe(false);
    });

    it('`isSuccess` is true', () => {
      expect(result.isSuccess).toBe(true);
    });

    it('`error` throws', () => {
      expect(() => result.error).toThrow(
        'Invalid Operation. Success result does not have an error.'
      );
    });

    it('`value` is set to the value passed in', () => {
      expect(result.value).toBe(42);
    });
  });

  describe('success without value (i.e. result of "command", as opposed to "query")', () => {
    const result = Result.success();

    it('`isFailure` is false', () => {
      expect(result.isFailure).toBe(false);
    });

    it('`isSuccess` is true', () => {
      expect(result.isSuccess).toBe(true);
    });

    it('`error` throws', () => {
      expect(() => result.error).toThrow(
        'Invalid Operation. Success result does not have an error.'
      );
    });

    it('`value` is undefined', () => {
      expect(result.value).toBe(undefined);
    });
  });
});
