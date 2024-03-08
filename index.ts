import { Bench } from "tinybench";

import { callOCRConcurrently } from "./concurrent";
import { callOCRInParallel } from "./parallel";

(async () => {
  const bench = new Bench();
  bench
    .add("Concurrent", async () => {
      await callOCRConcurrently();
    })
    .add("Parallel", async () => {
      await callOCRInParallel();
    });

  await bench.warmup();
  await bench.run();

  console.table(bench.table());
})();
