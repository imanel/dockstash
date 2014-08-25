## Dockstash

Dockstash sends Docker container logs (stderr and stdout) and resource usage statistics to Logstash. You can use it with Kibana to make awesome graphs like this:

![Kibana](http://img.linuxfr.org/img/687474703a2f2f7777772e656c61737469637365617263682e6f72672f636f6e74656e742f75706c6f6164732f323031332f30382f53637265656e2d53686f742d323031332d30372d31312d61742d352e30302e32382d504d2e706e67/Screen-Shot-2013-07-11-at-5.00.28-PM.png)

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
