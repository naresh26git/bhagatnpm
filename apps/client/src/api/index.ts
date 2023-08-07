import { rest, setupWorker } from "msw";
import { helpDesks } from "../pages/help-desk";
import { leaves } from "../pages/leave/leave";
import { families } from "../pages/profile/family";
import { personalInfos } from "../pages/profile/personal-info";
import { timeSheets } from "../pages/time-sheet";
import { getList } from "./get-list";

export const worker = setupWorker(
  rest.get("/api/v1/leaves", async (req, res, ctx) => {
    return res(ctx.json(getList(req.url, leaves)));
  }),
  rest.get("/api/v1/leaves/balance", async (req, res, ctx) => {
    return res(ctx.json(getList(req.url, leaves)));
  }),
  rest.get("/api/v1/time-sheets", async (req, res, ctx) => {
    return res(ctx.json(getList(req.url, timeSheets)));
  }),
  rest.get("/api/v1/help-desks", async (req, res, ctx) => {
    return res(ctx.json(getList(req.url, helpDesks)));
  }),
  rest.get("/api/v1/personal-info", async (req, res, ctx) => {
    return res(ctx.json(getList(req.url, personalInfos)));
  }),
  rest.get("/api/v1/family", async (req, res, ctx) => {
    return res(ctx.json(getList(req.url, families)));
  })
);
