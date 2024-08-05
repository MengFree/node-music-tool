const NodeID3 = require("node-id3");
const path = require("path");
const fs = require("fs");
const modeMaps = require("./const").MOD_MAPS;

exports.renameMusicByID = ({ source = "music", mode = 1 } = {}) => {
    const sourcePath = path.join(__dirname, "..", source);
    const [p1, p2] = modeMaps[mode];

    fs.readdirSync(sourcePath).forEach((file) => {
        const suffix = file.slice(file.lastIndexOf("."));
        const tags = NodeID3.read(path.join(sourcePath, file));
        const { album, title } = tags;
        if (!album || !title) {
            console.warn(`${file}: album=${album} title=${title}`);
            return;
        }

        const newFile = `${tags[p1]} - ${tags[p2]}.${suffix}`;

        if (newFile !== file) {
            fs.renameSync(
                path.join(sourcePath, file),
                path.join(sourcePath, newFile)
            );
        }
    });
};
