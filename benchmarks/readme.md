wrk "" -s attendance.lua --latency -t 1 -c 1 -d 30s
wrk -t500 -c1000 -d160s -s /Users/chakshugautam/Experiments/cQube/data-ingestion-ms/benchmarks/attendance.lua http://0.0.0.0:3333
wrk -t500 -c1000 -d160s -s http://localhost:3333
