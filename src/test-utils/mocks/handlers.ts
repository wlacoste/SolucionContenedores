import type { IPerson } from "domain/Person";
import { rest } from "msw";
import { setupServer } from "msw/node";
const ENDPOINT = "person/1";

export const dataSuccess: IPerson = {
  id: "1234",
  name: "John",
  lastName: "Wick",
};

export const handlers = [
  rest.get(process.env.REACT_APP_API + ENDPOINT, (req, res, ctx) => {
    return res(ctx.json(dataSuccess), ctx.delay(), ctx.status(200));
  }),
];

export const server = setupServer(...handlers);
