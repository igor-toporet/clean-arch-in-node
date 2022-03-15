import Result from "../Result";

export default class TaskList {
  private _name: TaskListName;

  constructor(name: TaskListName) {
    this._name = name;
  }

  get name(): TaskListName {
    return this._name;
  }
}

export class TaskListName {
  static create = (name: string): Result<TaskListName> =>
    name?.trim().length > 0
      ? Result.success(new TaskListName(name))
      : Result.failure("Task list name must be non-empty and non-whitespace.");

  private _value: string;

  private constructor(name: string) {
    this._value = name;
  }
  
  get value(): string {
    return this._value;
  }
}
