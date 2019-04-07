var FS = require("fs");
var Path = require("path");
var arr = [];
var list = findFiles("assets", arr);
var preloadKeys = "";
var infoKeys = "";
var loadingKeys = "";
var resources = [];
for (var i = 0; i < arr.length; i++) {
    var item = arr[i];
    var url = item;
    var type = getTypeByUrl(url);
    var arr1 = item.split("/");
    var name = arr1[arr1.length - 1].replace(".", "_");
    resources.push({ "name": name, "type": type, "url": url });
    if (url.indexOf("loading") != -1) {
        loadingKeys += name + ",";
    }
    else if(url.indexOf("infos/") != -1) {
        infoKeys += name + ",";
    }
    else {
        preloadKeys += name + ",";
    }
}
preloadKeys = preloadKeys.slice(0, preloadKeys.length - 1);
loadingKeys = loadingKeys.slice(0, loadingKeys.length - 1);
FS.writeFileSync("default.res.json", JSON.stringify({ groups: [{ keys: preloadKeys, name: "preload" }, { keys: loadingKeys, name: "loading" }, { keys: infoKeys, name: "info" }], resources: resources }, null, "\t"), "utf-8");
function findFiles(filePath, list, extension, filterFunc, checkDir) {
    var files = FS.readdirSync(filePath);
    var length = files.length;
    for (var i = 0; i < length; i++) {
        if (files[i].charAt(0) == ".") {
            continue;
        }
        var path = joinPath(filePath, files[i]);
        var stat = FS.statSync(path);
        if (stat.isDirectory()) {
            if (checkDir) {
                if (!filterFunc(path)) {
                    continue;
                }
            }
            findFiles(path, list, extension, filterFunc);
        }
        else if (filterFunc != null) {
            if (filterFunc(path)) {
                list.push(path);
            }
        }
        else if (extension) {
            var len = extension.length;
            if (path.charAt(path.length - len - 1) == "." &&
                path.substr(path.length - len, len).toLowerCase() == extension) {
                list.push(path);
            }
        }
        else {
            list.push(path);
        }
    }
}

function joinPath(dir) {
    var filename = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        filename[_i - 1] = arguments[_i];
    }
    var path = Path.join.apply(null, arguments);
    return path;
}

function getTypeByUrl(url) {
    var suffix = url.substr(url.lastIndexOf(".") + 1);
    if (suffix) {
        suffix = suffix.toLowerCase();
    }
    var type;
    switch (suffix) {
        case "xml":
        case "json":
        case "sheet":
            type = suffix;
            break;
        case "png":
        case "jpg":
        case "gif":
        case "jpeg":
        case "bmp":
            type = "image";
            break;
        case "fnt":
            type = "font";
            break;
        case "txt":
            type = "text";
            break;
        case "mp3":
        case "ogg":
        case "mpeg":
        case "wav":
        case "m4a":
        case "mp4":
        case "aiff":
        case "wma":
        case "mid":
            type = "sound";
            break;
        default:
            type = "bin";
            break;
    }
    return type;
};