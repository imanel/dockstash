## Dockstash

Dockstash sends Docker container logs (stderr and stdout) and resource usage statistics to Logstash.

### Installation

`npm install -g dockstash`

### Running

`dockstash --hosts <docker-hosts> --logstash <logstash-host:port>`

### Example Logstash conf

```
input {
  tcp {
    codec => json_lines {
      charset => "UTF-8"
    }
    port => 3000
  }
}

filter {
  date {
    match => [ "datetime", "MMM d kk:mm:ss.SSS", "UNIX" ]
    remove_field => "datetime"
  }
  multiline {
    pattern => "^\s"
    what => "previous"
  }
}

output {
  elasticsearch {
    host => "127.0.0.1"
    port => 9200
    protocol => "http"
  }
}
```

### License

MIT
