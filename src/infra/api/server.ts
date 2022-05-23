import "reflect-metadata";
import { routes } from "@infra/routes";
import express from "express";
import "../container";

const app = express();

app.use(express.json());

app.use(routes);
// app.get('/produto', (request: Request, response: Response) => {
//   return response.send('Hello Frutos do Goiás')
// });

app.listen("3333", () => console.log("Server is running on PORT 3333 🔥🔥🔥"));
