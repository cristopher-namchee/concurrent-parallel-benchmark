# Concurrent vs Parallel Benchmark

Benchmarking concurrent vs parallel execution of `.fetch` for multi-page OCR.

## Methodology

Both multi-tasking paradigm will run a (supposedly) 15-page OCR calls through a mock express API server. `setTimeout` is used to simulate the OCR engine processing time. The result is then collected by `tinybench`. The benchmark will then be executed 100 times for each paradigm.

Concurrent execution is done through `Promise.all`.

Parallel execution is done through Node worker threads, simplified by `tinypool`. Although, we still need `Promise.all` since we need to wait for all pages to finish.

## Result

Benchmark are executed on Node 18.17.0, i7-1255U, and 16 GB of DDR4 RAM.

```
┌─────────┬──────────────┬─────────┬────────────────────┬──────────┬─────────┐
│ (index) │  Task Name   │ ops/sec │ Average Time (ns)  │  Margin  │ Samples │
├─────────┼──────────────┼─────────┼────────────────────┼──────────┼─────────┤
│    0    │ 'Concurrent' │   '4'   │ 203882666.91993922 │ '±0.16%' │   100   │
│    1    │  'Parallel'  │   '2'   │  406982057.539993  │ '±0.07%' │   100   │
└─────────┴──────────────┴─────────┴────────────────────┴──────────┴─────────┘
```

## Conclusion

We don't need to use true parallelism with worker threads, as the task itself isn't CPU intensive