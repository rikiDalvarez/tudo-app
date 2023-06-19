import { requestHandler } from "../src/requestHandler";
import { IncomingMessage, ServerResponse } from "http";

describe("requestHandler", () => {
  let req: IncomingMessage;
  let res: ServerResponse;

  beforeEach(() => {
    // generate a mock request and response object;
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
    // Reset the mocks after each test case
    jest.resetAllMocks();
  });

  it("should handle GET request to /todos", () => {
    req.method = "GET";
    req.url = "/todos";

    requestHandler(req, res, "/todos", {});

    expect(res.statusCode).toBe(200);
    expect(res.end).toHaveBeenCalledWith("GET todos");
  });

  it("should handle other paths", () => {
    req.method = "GET";
    req.url = "/other";

    requestHandler(req, res, "/other", {});

    expect(res.statusCode).toBe(404);
    expect(res.end).toHaveBeenCalledWith("main page");
  });
});
