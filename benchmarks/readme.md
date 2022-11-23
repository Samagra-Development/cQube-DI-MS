Running the benchmark

```sh
wrk -t500 -c1000 -d160s -s ./benchmarks/attendance.lua http://0.0.0.0:3333
```
