import { IncomingMessage, ServerResponse } from "http";
import fs from "fs";
import path from "path";
const todoPath = path.join(__dirname, "../data/todo.json");

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
    res.statusCode = 201;
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const dataFile = JSON.parse(fs.readFileSync(todoPath, "utf-8"));
      dataFile.push(JSON.parse(body));
      fs.writeFileSync(todoPath, JSON.stringify(dataFile));
      res.end("Request body received");
    });
  } else {
    res.statusCode = 404;
    res.end("main page");
  }
};

export default requestHandler;
