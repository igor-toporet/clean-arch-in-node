import { URL } from "url";
import { TaskListCreateOut } from "../UseCases/TaskListCreateUseCase";
import PresenterBase, { Deps } from "./PresenterBase";

export default class TaskListCreatePresenter extends PresenterBase<TaskListCreateOut> {
  constructor(deps: Deps) {
    super(deps);
  }

  Present(model: TaskListCreateOut): void {
    const ctx = this.ctx;

    if (model.inputError) {
      ctx.status = 400;
      ctx.body = model.inputError!;
      return;
    }

    if (model.saveError) {
      ctx.status = 500;
      ctx.body = model.saveError!;
      return;
    }

    const locationUrl = `${ctx.protocol}://${ctx.host}${ctx.path}${model.result?.id}`;

    ctx.status = 201;
    ctx.set("Location", locationUrl);
    // TODO: map to REST contract
    ctx.body = model.result;
  }
}
