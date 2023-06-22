import { requestHandler } from "../src/requestHandler";
import { IncomingMessage, ServerResponse } from "http";
import fs from "fs";
import path from "path";

describe("requestHandler", () => {
  let req: IncomingMessage;
  let res: ServerResponse;

  const readFileSyncSpy = jest
    .spyOn(fs, "readFileSync")
    .mockImplementation((filePath: string) => {
      if (filePath === path.join(__dirname, "../data/todo.json")) {
        return "mock todo data";
      } else if (filePath === path.join(__dirname, "../data/done.json")) {
        return "mock done data";
      }
      throw new Error(`Unknown file path: ${filePath}`);
    });

  beforeEach(() => {
    req = {
      method: "",
      url: "",
    } as IncomingMessage;
    res = {
      statusCode: 0,
      end: jest.fn(),
    } as unknown as ServerResponse;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should handle GET request to /todos", () => {
    req.method = "GET";
    req.url = "/todos";

    requestHandler(req, res, "/todos", {});

    expect(res.statusCode).toBe(200);
    expect(readFileSyncSpy).toHaveBeenCalledTimes(2);
    expect(readFileSyncSpy).toHaveBeenCalledWith(
      path.join(__dirname, "../data/todo.json"),
      "utf-8"
    );
    expect(readFileSyncSpy).toHaveBeenCalledWith(
      path.join(__dirname, "../data/done.json"),
      "utf-8"
    );
  });

  it("should handle other paths", () => {
    req.method = "GET";
    req.url = "/other";

    requestHandler(req, res, "/other", {});

    expect(res.statusCode).toBe(404);
  });
});
