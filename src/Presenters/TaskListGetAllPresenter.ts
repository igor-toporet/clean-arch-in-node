import { TaskListGetAllOut } from "../UseCases/TaskListGetAllUseCase";
import PresenterBase, { Deps } from "./PresenterBase";


export default class TaskListGetAllPresenter
  extends PresenterBase<TaskListGetAllOut>
{

  constructor(deps: Deps) {
    super(deps);
  }

  Present(model: TaskListGetAllOut): void {
    this.ctx.body = model;
  }
}
