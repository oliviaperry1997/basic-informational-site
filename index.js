const http = require("node:http");
const fs = require("node:fs");

const server = http.createServer((req, res) => {
    fs.readFile("./index.html", "utf8", (err, data) => {
        if (err) {
            res.writeHead(500);
            console.error(err);
            return;
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
    });
});

server.listen(8080);
