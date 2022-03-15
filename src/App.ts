import Koa from "koa";
import bodyParser from "koa-bodyparser";
import "reflect-metadata";
import bootstrap from "./Bootstrap";

async function createApp() {
  return await bootstrap(new Koa().use(bodyParser()));
}

createApp().then((app) => app.listen(3000));
