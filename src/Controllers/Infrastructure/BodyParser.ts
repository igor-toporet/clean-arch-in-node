import Ajv, { JTDSchemaType } from "ajv/dist/jtd";
import { Context } from "koa";
import { IContextProvider } from "./ContextProvider";

export interface IBodyParser {
  parseAs<T>(schema: JTDSchemaType<T>): T;
}

type Deps = {
  contextProvider: IContextProvider;
};

export default class BodyParser implements IBodyParser {
  private readonly ajv = new Ajv();
  private readonly ctx: Context;
  //    private readonly map = new Map<Object,>()

  constructor(deps: Deps) {
    this.ctx = deps.contextProvider.currentContext;
  }

  parseAs<T>(schema: JTDSchemaType<T>): T {
    // parse will return T or undefined
    const parse = this.ajv.compileParser(schema);

    const json = this.ctx.request.rawBody;

    const data = parse(json); // T | undefined
    if (data === undefined)
      this.ctx.throw(
        400,
        `Invalid payload: ${parse.message} (Position: ${parse.position})`
      );

    // data is T here
    return data;
  }
}
