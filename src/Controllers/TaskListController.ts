import { JTDSchemaType } from "ajv/dist/jtd";
import { GET, POST, route } from "awilix-koa";

import { ITaskListCreateUseCase } from "../UseCases/TaskListCreateUseCase";
import { ITaskListGetAllUseCase } from "../UseCases/TaskListGetAllUseCase";
import { IBodyParser } from "./Infrastructure/BodyParser";

type Deps = {
  bodyParser: IBodyParser;
  taskListCreateUseCase: ITaskListCreateUseCase;
  taskListGetAllUseCase: ITaskListGetAllUseCase;
};

@route("/lists")
export default class TaskListController {
  private readonly bodyParser: IBodyParser;
  private readonly taskListCreateUseCase: ITaskListCreateUseCase;
  private readonly taskListGetAllUseCase: ITaskListGetAllUseCase;

  constructor(deps: Deps) {
    this.bodyParser = deps.bodyParser;
    this.taskListCreateUseCase = deps.taskListCreateUseCase;
    this.taskListGetAllUseCase = deps.taskListGetAllUseCase;
  }

  @GET()
  async getAll() {
    const useCaseInput = {};
    await this.taskListGetAllUseCase.Execute(useCaseInput);
  }

  @POST()
  async createList() {
    const payload =
      this.bodyParser.parseAs<ITaskListCreatePayload>(taskListCreateSchema);

    const useCaseInput = {
      name: payload.name
    };

    await this.taskListCreateUseCase.Execute(useCaseInput);
  }
}

interface ITaskListCreatePayload {
  name: string;
}

const taskListCreateSchema: JTDSchemaType<ITaskListCreatePayload> = {
  properties: {
    name: { type: "string" },
  },
};
