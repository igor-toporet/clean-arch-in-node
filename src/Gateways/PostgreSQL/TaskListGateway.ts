import { Connection } from "typeorm";
import TaskList, { TaskListName } from "../../Entities/TaskList";
import { Result } from "../../Result";
import ITaskListGateway, { TaskListCreated } from "../ITaskListGateway";
import { TaskListDto } from "./DTOs/TaskListDto";

type Deps = {
  dbConnection: Connection;
};

export default class TaskListGateway implements ITaskListGateway {
  private dbConnection: Connection;

  constructor(deps: Deps) {
    this.dbConnection = deps.dbConnection;
  }

  async create(taskList: TaskList): Promise<Result<TaskListCreated>> {
    const dto = new TaskListDto();
    dto.name = taskList.name.value;

    try {
      const saved = await this.dbConnection.manager.save(dto);

      return Result.success({
        id: saved.id.toString(),
        name: saved.name,
      });
    } catch (error) {
      return Result.failure(`Error inserting task list '${dto.name}'.`);
    }
  }

  async getAll(): Promise<Result<TaskList[]>> {
    try {
      const taskListDtos = await this.dbConnection.manager.find(TaskListDto);

      const taskLists = taskListDtos.map(this.ToEntity).map((r) => r.value);

      return Result.success(taskLists);
    } catch (error) {
      return Result.failure("Error retrieving all task lists.");
    }
  }

  private ToEntity(dto: TaskListDto): Result<TaskList> {
    const nameResult = TaskListName.create(dto.name);

    return nameResult.isSuccess
      ? Result.success(new TaskList(nameResult.value))
      : Result.failure(nameResult.error);
  }
}
