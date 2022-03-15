import { Context } from "koa";
import { IPresenter } from "./IPresenter";
import { IContextProvider } from "../Controllers/Infrastructure/ContextProvider";

export type Deps = {
  contextProvider: IContextProvider;
};

export default abstract class PresenterBase<T> implements IPresenter<T> {
  protected readonly ctx: Context;

  constructor(deps: Deps) {
    this.ctx = deps.contextProvider.currentContext;
  }

  abstract Present(model: T): void;
}
