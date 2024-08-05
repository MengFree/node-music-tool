const path = require("path");
const fs = require("fs");
const modeMaps = require("./const").MOD_MAPS;

/**
 * Copies files from a source directory to a dist directory, renaming them according to a specified mode.
 *
 * @param {Object} options - Options for the copy operation.
 * @param {string} options.source - The source directory. Defaults to "music".
 * @param {string} options.dist - The dist directory. Defaults to "files".
 * @param {number} options.mode - The mode for renaming files. Defaults to 1.
 * @return {void}
 */
exports.copyMusic = ({ source = "music", dist = "files", mode = 1 }) => {
    const sourcePath = path.join(__dirname, source);
    const destPath = path.join(__dirname, dist);
    const modes = modeMaps[mode];

    fs.readdirSync(sourcePath).forEach((file) => {
        let obj = {
            suffix: file.slice(file.lastIndexOf(".")),
            title: "",
            album: "",
        };
        const arr = file
            .slice(0, file.lastIndexOf("."))
            .split("-")
            .map((str) => str.trim());
        modes.forEach((item, index) => {
            obj[item] = arr[index];
        });

        let newFile = `${obj.album} - ${obj.title}.${obj.suffix}`;

        let outPutPath = path.join(destPath, obj.album);
        let newPath = path.join(outPutPath, newFile);
        fs.mkdirSync(outPutPath, { recursive: true });

        fs.copyFileSync(path.join(sourcePath, file), newPath);
    });
};
