# Concurrent vs Parallel Benchmark

Benchmarking concurrent vs parallel execution of `.fetch` for multi-page OCR.

## Methodology

Both multi-tasking paradigm will run a 15-page OCR calls. `setTimeout` is used to simulate the network and processing delay. The result is then collected by `tinybench`.

Concurrent execution is done through `Promise.all`.

Parallel execution is done through Node worker threads, simplified by `tinypool`.

## Result

Benchmark are executed on Node 18.17.0, i7-1255U, and 16 GB of DDR4 RAM.

```
┌─────────┬──────────────┬─────────┬───────────────────┬──────────┬─────────┐
│ (index) │  Task Name   │ ops/sec │ Average Time (ns) │  Margin  │ Samples │
├─────────┼──────────────┼─────────┼───────────────────┼──────────┼─────────┤
│    0    │ 'Concurrent' │   '4'   │ 200908824.4009763 │ '±0.06%' │   10    │
│    1    │  'Parallel'  │   '2'   │ 404077718.2009071 │ '±0.11%' │   10    │
└─────────┴──────────────┴─────────┴───────────────────┴──────────┴─────────┘
```

## Conclusion

We don't need to use true parallelism with worker threads, as the task itself isn't CPU intensive