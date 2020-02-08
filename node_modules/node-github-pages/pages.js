var path = require("path");
var fs = require("fs");
var app = {};


var options = {};




var changePathToAbsolute = function (filePath) {
    if (!path.isAbsolute(filePath)) {
        filePath = path.join(path.resolve("./"), filePath);
    }
    return filePath;
}

var ensureDirectoryExistence = function (filePath) {
    var dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}

var copyFolderSync = function (from, to) {
    if (!fs.existsSync(to)) {
        fs.mkdirSync(to);
    }
    from = changePathToAbsolute(from);
    to = changePathToAbsolute(to);
    fs.readdirSync(from).forEach(element => {
        if (fs.lstatSync(path.join(from, element)).isFile()) {
            fs.copyFileSync(path.join(from, element), path.join(to, element));
        } else {
            copyFolderSync(path.join(from, element), path.join(to, element));
        }
    });
}

var _mergeOptions = function (_options) {
    var options = {
        path: path.join(path.resolve("./"), "docs"),
        watch: false
    };
    options = Object.assign({}, options, _options);
    options.path = changePathToAbsolute(options.path);
    return options;

}

var _renderFile = function (file) {
    app.render(file.view, file.options, function (err, html) {
        if (err) {

        }
        else {
            var filename = path.join(options.path, file.url, "index.html");
            ensureDirectoryExistence(filename);
            fs.writeFile(filename, html, { flag: "w", encoding: "utf8" }, function (err) {
                console.log(err);
            });
        }
    });
}

var _renderFiles = function (list = []) {
    list.forEach(function (item, index) {
        _renderFile(item);
    });
}




module.exports = (function (_app, _options) {
    app = _app;
    options = _mergeOptions(_options);
    console.log(require.main.filename);
    console.log(process.mainModule.filename);
    console.log(path.resolve("./"));
    if (options.static) {
        if (!Array.isArray(options.static)) {
            options.static = [options.static];
        }
        var i = 0;
        for (i = 0; i < options.static.length; i++) {
            console.log(options.static[i], options.path);
            copyFolderSync(options.static[i], options.path);
        }
    }

    return {
        renderFile: _renderFile,
        renderFiles: _renderFiles
    };
})