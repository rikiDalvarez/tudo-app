import { request } from "http";

export const requestHandler = (req, res, path: string, query) => {
  if (path === "/todos" && req.method === "GET") {
  } else {
    res.statusCode = 404;
    res.end();
  }
};

export default requestHandler;
