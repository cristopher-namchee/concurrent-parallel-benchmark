import express from "express";

import { callOCRConcurrently } from "./concurrent";
import { callOCRInParallel } from "./parallel";

const app = express();

app.get("/concurrent", async (_, res) => {
  const result = await callOCRConcurrently();

  return res.status(200).json(result);
});

app.get("/parallel", async (_, res) => {
  const result = await callOCRInParallel();

  return res.status(200).json(result);
});

app.listen(6969, () => {
  console.log("Test server is up in 6969");
});
