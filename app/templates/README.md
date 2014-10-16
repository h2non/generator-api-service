# <%= package %>

An awesome service powered by node.js, restify, winston and more...

## Installation

Only [node.js](http://nodejs.org) is required to setup the service

Install the package
```bash
$ npm install -g <%= package %>
```

Start the server
```bash
$ <%= package %> --port 8080 --host 0.0.0.0 --debug
```

## API

`Document here the HTTP API`

### GET /api/heartbeat 
Response type: `application/json`

Check the API and server status. If all it's fine, a 204 status code will be returned

### GET /api/test
Response type: `application/json`

Test endpoint

### POST /api/test
Accept type: `application/json` Response type: `application/json`

Test endpoint

## License

MIT - Authors
