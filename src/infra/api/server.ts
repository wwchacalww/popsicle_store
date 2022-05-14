import express, { Request, Response } from "express";


const app = express();

app.use(express.json());

app.get('/produto', (request: Request, response: Response) => {
  return response.send('Hello Frutos do Goiás')
});

app.listen("3333", () => console.log("Server is running on PORT 3333 🔥🔥🔥"));