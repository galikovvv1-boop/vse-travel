import { handle } from "hono/netlify";
import { app } from "./app";

export default handle(app);
