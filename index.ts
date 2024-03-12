import { Bench } from "tinybench";

import express from "express";

import { callOCRConcurrently } from "./concurrent";
import { callOCRInParallel } from "./parallel";

const app = express();

app.get("/concurrent", async (_, res) => {
  const result = await callOCRConcurrently();

  return res.json(result);
});

app.get("/parallel", async (_, res) => {
  const result = await callOCRInParallel();

  return res.json(result);
});

const server = app.listen(1234, async () => {
  const bench = new Bench({ iterations: 100 });
  bench
    .add("Concurrent", async () => {
      const result = await fetch("http://localhost:1234/concurrent");

      // transform the result to JSON
      await result.json();
    })
    .add("Parallel", async () => {
      const result = await fetch("http://localhost:1234/parallel");

      // transform the result to json
      await result.json();
    });

  await bench.warmup();
  await bench.run();

  console.table(bench.table());

  server.close();
});
