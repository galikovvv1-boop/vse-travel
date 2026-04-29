import { handle } from "hono/netlify";
import { app } from "../../api/app";

export default handle(app);
