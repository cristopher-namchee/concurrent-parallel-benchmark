import { Bench } from "tinybench";

import express from "express";

import { callOCRConcurrently } from "./concurrent";
import { callOCRInParallel } from "./parallel";
import { callOCRSequentially } from "./sequential";

const app = express();

app.get("/concurrent", async (_, res) => {
  const result = await callOCRConcurrently();

  return res.json(result);
});

app.get("/parallel", async (_, res) => {
  const result = await callOCRInParallel();

  return res.json(result);
});

app.get("/sequential", async (_, res) => {
  const result = await callOCRSequentially();

  return res.json(result);
});

const server = app.listen(1234, async () => {
  console.log("Listening on 1234");
});
