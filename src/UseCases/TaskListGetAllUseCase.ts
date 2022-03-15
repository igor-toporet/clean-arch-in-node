import TaskList from "../Entities/TaskList";
import ITaskListGateway from "../Gateways/ITaskListGateway";
import { IPresenter } from "../Presenters/IPresenter";
import { IUseCase, UseCaseBase } from "./IUseCase";

export type TaskListGetAllIn = {};

export type TaskListSummary = {
  name: string;
  incompleteTasks: number;
};
export type TaskListGetAllOut = {
  saveError?: string;
  lists?: TaskListSummary[];
};

export interface ITaskListGetAllUseCase extends IUseCase<TaskListGetAllIn> {}

type Deps = {
  taskListGateway: ITaskListGateway;
  taskListGetAllPresenter: IPresenter<TaskListGetAllOut>;
};

export default class TaskListGetAllUseCase
  extends UseCaseBase<TaskListGetAllIn, TaskListGetAllOut>
  implements ITaskListGetAllUseCase
{
  private readonly taskListGateway: ITaskListGateway;

  constructor(deps: Deps) {
    super(deps.taskListGetAllPresenter);

    this.taskListGateway = deps.taskListGateway;
  }

  async Execute(input: TaskListGetAllIn): Promise<void> {
    const output = await this.DoIt(input);

    this.presenter.Present(output);
  }

  private async DoIt(_: TaskListGetAllIn): Promise<TaskListGetAllOut> {
    const result = await this.taskListGateway.getAll();

    if (result.isFailure) {
      return { saveError: result.error };
    }

    const listSummaries = result.value.map(this.ToListSummary);

    return { lists: listSummaries };
  }

  private ToListSummary(taskList: TaskList): TaskListSummary {
    return {
      name: taskList.name.value,
      incompleteTasks: 0,
    };
  }
}
