import { IncomingMessage, ServerResponse } from "http";

export const requestHandler = (
  req: IncomingMessage,
  res: ServerResponse,
  path: string,
  query: unknown
) => {
  if (path === "/todos" && req.method === "GET") {
    res.statusCode = 200;
    return res.end("GET todos");
  } else {
    res.statusCode = 404;
    res.end("main page");
  }
};

export default requestHandler;
