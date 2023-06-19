import { request } from "http";

function requestHandler(req, res, path, query) {
  console.log("requestHandler called");
  res.end("Hello World");
}

export default requestHandler;
