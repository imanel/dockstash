## Dockstash

Dockstash sends Docker container logs (stderr and stdout) and resource usage statistics to Logstash.

### Installation

`npm install -g dockstash`

### Running

`dockstash --host <logstash-host> --port <logstash-port>`

### Additional options

* `--dir`: Docker container directory (defaults to `/var/lib/docker/containers`)
* `--interval`: Interval in seconds to wakeup and process logs and stats

### License

MIT
