import http from "http";
import fs from "fs";
import path from "path";

const PORT = process.env.PORT;

const server = http
  .createServer((req, res) => {
    // const q = url.parse(req.url, true).pathname;
    const url = req.url === "/" ? "/index.html" : req.url + ".html";
    const page404 = "./public/404.html";
    const filePath = path.join("./public", url);
    // const filePath = path.join(__dirname, "public", url);
    const ext = path.extname(filePath);

    let contentType = "text/html";
    switch (ext) {
      case ".js":
        contentType = "text/javascript";
        break;
      case ".css":
        contentType = "text/css";
        break;
      case ".json":
        contentType = "text/json";
        break;
      case ".png":
        contentType = "image/png";
        break;
      case ".jpeg":
        contentType = "image/jpeg";
        break;
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        // console.log(err);
        if (err.code === "ENOENT") {
          fs.readFile(page404, (err, data) => {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end(data);
          });
        } else {
          res.writeHead(500);
          res.end(`Server error: ${err}`);
        }
      } else {
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
      }
    });
  })
  .listen(PORT, () => console.log(`Listening on port: ${PORT}`));
