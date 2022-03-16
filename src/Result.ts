export class Result<T> {
  static success = <U>(value: U | undefined = undefined): Result<U> =>
    new Result(value, undefined);

  static failure = <U>(error: string): Result<U> =>
    new Result<U>(undefined, error);

  readonly #value: T | undefined;

  readonly #error: string | undefined;

  readonly #isFailure: boolean;

  readonly #isSuccess: boolean;

  private constructor(value: T | undefined, error: string | undefined) {
    this.#value = value;
    this.#error = error;

    this.#isSuccess = error === undefined;
    this.#isFailure = !this.#isSuccess;
  }

  get isFailure(): boolean {
    return this.#isFailure;
  }

  get isSuccess(): boolean {
    return this.#isSuccess;
  }

  get error(): string {
    if (this.isSuccess) {
      throw new Error(
        'Invalid Operation. Success result does not have an error.'
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.#error!;
  }

  get value(): T {
    if (this.isFailure) {
      throw new Error(
        'Invalid Operation. Failure result does not have a value.'
      );
    }

    return this.#value as T;
  }
}
