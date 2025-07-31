const express = require("express");
const path = require("path");

const app = express();
const PORT = 8080;

app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "about.html"));
});

app.get("/contact-me", (req, res) => {
    res.sendFile(path.join(__dirname, "contact-me.html"));
});

app.get("/fail", (req, res) => {
    res.status(500).send(`
        <h1>500 Internal Server Error</h1>
        <iframe width="560" height="315"
            src="https://www.youtube.com/embed/aqsEa1P8iPQ?si=4jM7d2nuwVJAXC9u&amp;controls=0&amp;clip=Ugkx1UBLkT6YVmAc6IAcHHipoioBR8LlQOvf&amp;clipt=EKCRDRi8wg0"
            title="YouTube video player" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
        </iframe>
    `);
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "404.html"));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
