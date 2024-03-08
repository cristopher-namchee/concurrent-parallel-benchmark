import express from "express";

import { callOCRConcurrently } from "./concurrent";
import { callOCRInParallel } from "./parallel";

const app = express();

app.get("/concurrent", async (_, res) => {
  console.log("Getting request for concurrent execution");

  const result = await callOCRConcurrently();

  return res.status(200).json(result);
});

app.get("/parallel", async (_, res) => {
  console.log("Getting request for parallel execution");

  const result = await callOCRInParallel();

  return res.status(200).json(result);
});

app.listen(6969, () => {
  console.log("Test server is up in 6969");
});
