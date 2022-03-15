import Result from "../Result";
import TaskList from "../Entities/TaskList";

export type TaskListCreated = {
  id: string;
  name: string;
};

export default interface ITaskListGateway {
  create(taskList: TaskList): Promise<Result<TaskListCreated>>;

  getAll(): Promise<Result<TaskList[]>>;
}
