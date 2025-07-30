const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const server = http.createServer((req, res) => {
    let filePath = "." + req.url;

    if (filePath === "./fail") {
        res.writeHead(500, { "Content-Type": "text/html" });
        res.end(
            '<h1>500 Internal Server Error</h1><iframe width="560" height="315" src="https://www.youtube.com/embed/aqsEa1P8iPQ?si=4jM7d2nuwVJAXC9u&amp;controls=0&amp;clip=Ugkx1UBLkT6YVmAc6IAcHHipoioBR8LlQOvf&amp;clipt=EKCRDRi8wg0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
        );
        return;
    }

    if (filePath === "./") {
        filePath = "./index.html";
    } else if (filePath === "./about") {
        filePath = "./about.html";
    } else if (filePath === "./contact-me") {
        filePath = "./contact-me.html";
    } else if (filePath === "./crash") {
        throw new Error();
    }

    const extname = path.extname(filePath);
    let contentType = "text/html";

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            if (err.code === "ENOENT") {
                fs.readFile("./404.html", "utf8", (err404, data404) => {
                    res.writeHead(404, { "Content-Type": "text/html" });
                    if (err404) {
                        res.end('<h1>404 "404 Not Found" Not Found');
                    } else {
                        res.end(data404);
                    }
                });
            } else {
                res.writeHead(500, { "Content-Type": "text/html" });
                res.end(
                    '<h1>500 Internal Server Error</h1><iframe width="560" height="315" src="https://www.youtube.com/embed/aqsEa1P8iPQ?si=4jM7d2nuwVJAXC9u&amp;controls=0&amp;clip=Ugkx1UBLkT6YVmAc6IAcHHipoioBR8LlQOvf&amp;clipt=EKCRDRi8wg0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
                );
            }
            return;
        }
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
    });
});

server.listen(8080);
