## Dockstash

Dockstash sends Docker container logs (stderr and stdout) and resource usage statistics to Logstash.

### Installation

`npm install -g dockstash`

### Running

`dockstash --host <logstash-host> --port <logstash-port>`

### Additional options

* `--dir`: Docker container directory (defaults to `/var/lib/docker/containers`)
* `--interval`: Interval in seconds to wakeup and process logs and stats

### A note on log rotation

Log rotation with zero data loss is pretty tough. We're using the same `copytruncate` approach that logrotate uses to rotate logs. Generally, copying the log file, then using `truncate(2)` to truncate the original file. Docker is writing logs to the original log file all the while so it is possible to have a partial log entry written after `truncate(2)`. We currently toss out partial lines that are written between the copy and truncate operations.

### License

MIT
