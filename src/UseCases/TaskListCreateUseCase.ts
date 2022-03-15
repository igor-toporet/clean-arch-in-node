import TaskList, { TaskListName } from "../Entities/TaskList";
import ITaskListGateway, {
  TaskListCreated,
} from "../Gateways/ITaskListGateway";
import { IPresenter } from "../Presenters/IPresenter";
import { IUseCase, UseCaseBase } from "./IUseCase";

export type TaskListCreateIn = {
  name: string;
};

export type TaskListCreateOut = {
  inputError?: string;
  saveError?: string;
  result?: TaskListCreated;
};

export interface ITaskListCreateUseCase extends IUseCase<TaskListCreateIn> {}

type Deps = {
  taskListCreatePresenter: IPresenter<TaskListCreateOut>;
  taskListGateway: ITaskListGateway;
};

export default class TaskListCreateUseCase
  extends UseCaseBase<TaskListCreateIn, TaskListCreateOut>
  implements ITaskListCreateUseCase
{
  private readonly taskListGateway: ITaskListGateway;
  
  constructor(deps: Deps) {
    super(deps.taskListCreatePresenter);

    this.taskListGateway = deps.taskListGateway;
  }

  async Execute(input: TaskListCreateIn): Promise<void> {
    const output = await this.DoIt(input);

    this.presenter.Present(output);
  }

  private async DoIt(input: TaskListCreateIn): Promise<TaskListCreateOut> {
    const nameResult = TaskListName.create(input.name);

    if (nameResult.isFailure) {
      return { inputError: nameResult.error };
    }

    const taskList = new TaskList(nameResult.value);

    const createResult = await this.taskListGateway.create(taskList);

    if (createResult.isFailure) {
      return { saveError: createResult.error };
    }

    return { result: createResult.value };
  }
}
