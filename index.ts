import express from "express";

import { callOCRConcurrently } from "./concurrent";

const app = express();

app.get("/concurrent", async (req, res) => {
  const result = await callOCRConcurrently();

  return res.status(200).json(result);
});

app.listen(6969, () => {
  console.log("Test server is up in 6969");
});
