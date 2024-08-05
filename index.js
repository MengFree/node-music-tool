const renameMusic = require("./utils/rename");
const musicMove = require("./utils/music-move");
const args = require("minimist")(process.argv.slice(2));
// node index.js --type=rename --source=music --dist=files --mode=1

console.info("args", JSON.stringify(args));

if (args.type === "rename") {
    console.log("rename music files");
    renameMusic.renameMusicByID(args);
}

if (args.type === "move") {
    console.log("moving music files");
    musicMove.copyMusic(args);
}
