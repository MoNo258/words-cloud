import { rest } from "msw";
import { apiResponse } from "./fakers";

export const handlers = [
  rest.get("/api/v1/words", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(apiResponse as IApiResponse));
  }),
];
