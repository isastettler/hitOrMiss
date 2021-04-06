const path = require("path");
const express = require("express");
const morgan = require("morgan");
const compression = require("compression");

const PORT = process.env.PORT || 8080;
const app = express()

const createApp = () => {
    app.use(morgan("dev"));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(compression());
    app.use(express.static(path.join(__dirname, "..", "public")));

    app.use((req, res, next) => {
        if(path.extname(req.path).length) {
            const err = new Error("Not found");
            err.status = 404;
            next(err);
        } else {
            next();
        }
    });
    app.use("*", (req, res) => {
        res.sendFile(path.join(__dirname, "..", "public/index.html"));
    });
}


    const startLinening = () => {
        const server = app.listen(PORT, () => console.log(`Ready to hit on port ${PORT}`)
        );
    }

    async function bootApp() {
        await createApp();
        await startLinening();
    }

    if(require.main === module) {
        bootApp();
    } else {
        createApp();
    }

    module.exports = app;