const express = require("express");
const hbs = require("express-handlebars");
const app = express();
const PORT = 3000;
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const defaultContext = require("./data/data.json");
const filepath = path.join(__dirname, "upload");
const formidable = require('formidable');
const Jimp = require("jimp");
let context = {
    fileName: [],
    dirName: [],
    directory: '',
    pathDirs: ''
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({
    defaultLayout: 'main.hbs',
    helpers: {
        pathHelper: function (tabpath) {
            const slicedPath = tabpath.split("\\");
            const partPath = slicedPath[slicedPath.length - 1];
            return partPath;
        },
    },
    extname: '.hbs',
    partialsDir: "views/partials",
}));
app.set('view engine', 'hbs');
app.use(express.static('static'));
app.use(express.static('upload'));

refreshFiles = async (dirPath) => {
    context.fileName = [];
    context.dirName = [];
    const data = await fsPromises.readdir(dirPath);
    for (let i = 0; i < data.length; i++) {
        const stat = await fsPromises.lstat(path.join(dirPath, data[i]));
        if (stat.isDirectory()) {
            context.dirName.push(data[i]);
        } else {
            context.fileName.push(data[i]);
        }
    }
    context.fileName.sort();
    context.dirName.sort();
}

app.get('/', async (req, res) => {
    await refreshFiles(filepath);
    res.render("filemanager.hbs", context);
});

app.post('/createDirectory', async (req, res) => {
    console.log(req.body);
    const dirPath = path.join(filepath, context.directory, req.body.dirName);
    const currentDir = path.join(filepath, context.directory);
    console.log(dirPath);
    if (!fs.existsSync(dirPath)) {
        await fsPromises.mkdir(dirPath);
        await refreshFiles(currentDir);
        res.render("filemanager.hbs", context);
    } else {
        console.log("Taki folder już istnieje");
        await refreshFiles(currentDir);
        res.render("filemanager.hbs", context);
    }
});

app.post('/createFile', async (req, res) => {
    console.log(req.body);
    const newFilePath = path.join(filepath, context.directory, req.body.fileName);
    const currentDir = path.join(filepath, context.directory);
    console.log(newFilePath);
    if (fs.existsSync(newFilePath)) {
        console.log("Taki plik już istnieje");
        await refreshFiles(currentDir);
        res.render("filemanager.hbs", context);
    } else {
        await fsPromises.writeFile(newFilePath, "");
        await refreshFiles(currentDir);
        res.render("filemanager.hbs", context);
    }
});

app.post('/uploadFile', async (req, res) => {
    const currentDir = path.join(filepath, context.directory);
    const form = formidable({});
    form.uploadDir = currentDir;
    form.keepExtensions = true;
    form.multiples = true;
    form.parse(req, async (err, fields, files) => {
        if (form.bytesExpected !== form.bytesReceived) throw err;
        await refreshFiles(currentDir);
        res.render("filemanager.hbs", context);
    });
});

app.post('/delete', async (req, res) => {
    console.log(req.body);
    const deletePath = path.join(filepath, context.directory, req.body.deleteName);
    const currentDir = path.join(filepath, context.directory);
    const stat = await fsPromises.lstat(deletePath);
    if (stat.isDirectory()) {
        await fsPromises.rm(deletePath, { recursive: true, force: true });
    } else {
        await fsPromises.unlink(deletePath);
    }
    await refreshFiles(currentDir);
    res.render("filemanager.hbs", context);
});

app.get('/directory', async (req, res) => {
    const currentDir = path.join(filepath, req.query.path ? req.query.path : "", req.query.name ? req.query.name : "");
    context.directory = path.join(req.query.path, req.query.name);
    const dirsInPath = path.join(req.query.path, req.query.name).split("\\");
    const pathDirs = [];
    for (let i = 0; i < dirsInPath.length; i++) {
        let tempPath = "";
        for (let j = 0; j <= i; j++) {
            tempPath = path.join(tempPath, dirsInPath[j]);
        }
        pathDirs.push(tempPath);
    }
    context.pathDirs = pathDirs.filter(e => { return e !== "." });
    await refreshFiles(currentDir);
    console.log(context);
    res.render("filemanager.hbs", context);
});

app.post('/rename', async (req, res) => {
    console.log(req.body.directory);
    if (context.directory === "" || context.directory === ".") {
        res.render("filemanager.hbs", context);
    } else {
        const currentDir = path.join(filepath, req.body.directory);
        const slicedDir = req.body.directory.split("\\");
        slicedDir.pop();
        if (req.body.type === "directory") {
            slicedDir.push(req.body.newName);
        } else {
            const fileExt = req.body.directory.split('.').pop();
            slicedDir.push(req.body.newName + "." + fileExt);
        }
        const unslicedPath = path.join.apply(null, slicedDir);
        const newPath = path.join(filepath, unslicedPath);
        if (!fs.existsSync(newPath)) {
            if (req.body.type === "directory") {
                await fsPromises.rename(currentDir, newPath);
                await refreshFiles(newPath);
                const pathDirs = [];
                for (let i = 0; i < slicedDir.length; i++) {
                    let tempPath = "";
                    for (let j = 0; j <= i; j++) {
                        tempPath = path.join(tempPath, slicedDir[j]);
                    }
                    pathDirs.push(tempPath);
                }
                context.pathDirs = pathDirs;
                context.directory = unslicedPath;
                console.log(context);
                res.render("filemanager.hbs", context);
            } else {
                await fsPromises.rename(currentDir, newPath);
                const imageContext = {
                    image_path: unslicedPath,
                    filters: ["None", "grayscale", "invert", "sepia"]
                }
                res.render("imageEditor.hbs", imageContext);
            }
        }
        else {
            console.log("Taki folder już istnieje");
            await refreshFiles(currentDir);
            res.render("filemanager.hbs", context);
        }
    }
});

app.get('/file', async (req, res) => {
    const fileName = req.query.name;
    const pathToFile = path.join(context.directory, req.query.name);
    const fileExt = fileName.split('.').pop();
    switch (fileExt) {
        case "jpg":
        case "png":
        case "jpeg":
            const imageContext = {
                image_path: pathToFile,
                filters: ["None", "grayscale", "invert", "sepia"]
            }
            res.render("imageEditor.hbs", imageContext);
            break;
        default:
            console.log(fileExt);
            res.render("filemanager.hbs", context);
            break;
    }
});

app.get("/preview", (req, res) => {
    const filePath = path.join(filepath, req.query.name);
    res.sendFile(filePath);
});

app.post("/saveImage", (req, res) => {
    const filter = req.body.filter;
    const file = path.join(filepath, req.body.name);
    Jimp.read(file, (err, image) => {
        if (err) throw err;
        switch (filter) {
            case "None":
                image.normalize().write(file);
                break;
            case "sepia":
                image.sepia().write(file);
                break;
            case "invert":
                image.invert().write(file);
                break;
            case "grayscale":
                image.grayscale().write(file);
                break;
            default:
                break;
        }
        res.send(JSON.stringify("OK"));
    });
});

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT);
});