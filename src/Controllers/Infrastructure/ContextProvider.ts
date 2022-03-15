import { Context, Next } from "koa";

export interface IContextProvider {
  get currentContext(): Context;
}

interface IContextStore {
  set currentContext(ctx: Context);
}

export default class ContextProvider
  implements IContextProvider, IContextStore
{
  readonly currentContext!: Context;
}

type Deps = {
  contextProvider: IContextStore;
};

export function ContextProviderMiddleware(
  deps: Deps
): (ctx: Context, next: Next) => Promise<void> {
  return async (ctx: Context, next: Next): Promise<void> => {
    deps.contextProvider.currentContext = ctx;

    await next();
  };
}
