import { IPresenter } from "../Presenters/IPresenter";

export interface IUseCase<TInput> {
  Execute(input: TInput): Promise<void>;
}

export abstract class UseCaseBase<TInput, TOutput> implements IUseCase<TInput> {
  protected presenter: IPresenter<TOutput>;

  constructor(presenter: IPresenter<TOutput>) {
    this.presenter = presenter;
  }

  abstract Execute(input: TInput): Promise<void>;
}
