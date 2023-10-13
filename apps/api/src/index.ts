require("dotenv").config();

import "module-alias/register";
import { App } from "./app";

import { BooktRoute } from "@routes/book.route";
import { ValidateEnv } from "@utils/validateEnv";

ValidateEnv();

const app = new App([new BooktRoute()]);

app.listen();
