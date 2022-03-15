import Koa from "koa";
import { createContainer } from "awilix";
import { inject, loadControllers, scopePerRequest } from "awilix-koa";
import { ContextProviderMiddleware } from "./Controllers/Infrastructure/ContextProvider";
import registerDbConnection from "./Gateways/PostgreSQL/Bootstrap";

export default async function (app: Koa): Promise<Koa> {
  const container = createContainer();

  container.loadModules(
    [
      "UseCases/*UseCase.ts",
      "Presenters/*Presenter.ts",
      "Controllers/Infrastructure/*.ts",
      "Gateways/PostgreSQL/*Gateway.ts",
    ],
    {
      cwd: __dirname,
      formatName: "camelCase",
      resolverOptions: {
        lifetime: "SCOPED",
      },
    }
  );

  await registerDbConnection(container);

  return app
    .use(scopePerRequest(container))
    .use(inject(ContextProviderMiddleware))
    .use(loadControllers("Controllers/*Controller.ts", { cwd: __dirname }));
}
