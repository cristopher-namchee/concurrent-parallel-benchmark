# Concurrent vs Parallel Benchmark

Benchmarking concurrent vs parallel execution of `.fetch` for multi-page OCR.

## Requirements

1. [`wrk`](https://github.com/wg/wrk), either on docker on direct install.

## How to Run

> [!IMPORTANT]  
> Ensure that port 1234 is available

1. Clone the repository
2. Install the dependencies using `pnpm install`
3. Start the dev server using `pnpm run start`
4. Run the benchmark using `pnpm run bench`

## Methodology

Both multi-tasking paradigm will run a (supposedly) 15-page OCR calls through a mock express API server. `setTimeout` is used to simulate the OCR engine processing time. The results are then measured with `wrk`

Concurrent execution is done through `Promise.all`.

Parallel execution is done through Node worker threads, simplified by `tinypool`. Although, we still need `Promise.all` since we need to wait for all pages to finish.

## Result

Benchmark are executed on Node 18.17.0, i7-1255U, and 16 GB of DDR4 RAM.

### Sequential Execution

```bash
Running 30s test @ http://localhost:1234/sequential
  4 threads and 10 connections
  Thread calibration: mean lat.: 9223372036854776.000ms, rate sampling interval: 10ms
  Thread calibration: mean lat.: 9223372036854776.000ms, rate sampling interval: 10ms
  Thread calibration: mean lat.: 9223372036854776.000ms, rate sampling interval: 10ms
  Thread calibration: mean lat.: 9223372036854776.000ms, rate sampling interval: 10ms
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    15.04s     0.00us  15.03s     0.00%
    Req/Sec     0.11      4.76   222.00     99.95%
  8 requests in 30.02s, 22.24KB read
  Socket errors: connect 0, read 0, write 0, timeout 112
Requests/sec:      0.27
Transfer/sec:     758.68B
```

### Concurrent Execution

```bash
Running 30s test @ http://localhost:1234/concurrent
  4 threads and 10 connections
  Thread calibration: mean lat.: 1834.040ms, rate sampling interval: 4915ms
  Thread calibration: mean lat.: 1834.894ms, rate sampling interval: 4915ms
  Thread calibration: mean lat.: 1835.491ms, rate sampling interval: 4919ms
  Thread calibration: mean lat.: 1835.377ms, rate sampling interval: 4919ms
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     4.83s     1.18s    6.77s    60.00%
    Req/Sec     2.00      0.00     2.00    100.00%
  232 requests in 30.02s, 645.02KB read
Requests/sec:      7.73
Transfer/sec:     21.48KB
```

### Parallel Execution

```bash
Running 30s test @ http://localhost:1234/parallel
  4 threads and 10 connections
  Thread calibration: mean lat.: 5014.272ms, rate sampling interval: 16039ms
  Thread calibration: mean lat.: 6135.296ms, rate sampling interval: 18284ms
  Thread calibration: mean lat.: 6137.856ms, rate sampling interval: 12279ms
  Thread calibration: mean lat.: 5015.552ms, rate sampling interval: 10035ms
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    19.01s     5.21s   27.46s    53.85%
    Req/Sec     0.00      0.00     0.00    100.00%
  19 requests in 30.03s, 52.83KB read
  Socket errors: connect 0, read 0, write 0, timeout 102
Requests/sec:      0.63
Transfer/sec:      1.76KB
```

## Conclusion

Since it's evident that worker threads actually leads to slower processing time (even slower than sequential execution), we don't need to use true parallelism with worker threads, as the task itself isn't CPU intensive.

It might be slower because managing worker threads isn't free (start, concurrency, and terminating)