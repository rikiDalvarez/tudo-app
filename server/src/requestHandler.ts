import { IncomingMessage, ServerResponse } from "http";
import fs from "fs";
import path from "path";
const todoPath = path.join(__dirname, "../data/todo.json");
const donePath = path.join(__dirname, "../data/done.json");

export const requestHandler = (
  req: IncomingMessage,
  res: ServerResponse,
  reqPath: string,
  query: unknown
) => {
  if (reqPath === "/todos" && req.method === "GET") {
    res.statusCode = 200;
    const data = fs.readFileSync(
      path.join(__dirname, "../data/todo.json"),
      "utf-8"
    );
    res.end(data);
  } else if (reqPath === "/todos" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const dataFile = JSON.parse(fs.readFileSync(todoPath, "utf-8"));
      dataFile.push(JSON.parse(body));
      fs.writeFileSync(todoPath, JSON.stringify(dataFile));
      res.statusCode = 201;
      res.end("Request body received");
    });
  } else if (reqPath === "/todos" && req.method === "PUT") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const updatedTodos = JSON.parse(body);
      const dataFile = JSON.parse(fs.readFileSync(todoPath, "utf-8"));
      const doneFile = JSON.parse(fs.readFileSync(donePath, "utf-8"));

      // Update the todos in the dataFile based on the received updatedTodos

      updatedTodos.forEach((todo, index) => {
        if (todo.done === true) {
          const element = updatedTodos.splice(index, 1);
          doneFile.push(element[0]);
        }
      });

      // dataFile.forEach((todo, index) => {
      //   if (updatedTodos[index]) {
      //     todo.done = updatedTodos[index].done;
      //   }
      // });

      // Write the updated todos back to the JSON file
      fs.writeFileSync(todoPath, JSON.stringify(updatedTodos));
      fs.writeFileSync(donePath, JSON.stringify(doneFile));

      res.statusCode = 204;
      res.end("Todos updated successfully");
    });
  }
};

export default requestHandler;
