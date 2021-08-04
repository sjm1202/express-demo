const fs = require("fs");
const { promisify } = require("util");
const path = require("path")
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const dbPath = path.join(__dirname, "./data.json")
exports.getDB = async () => {
    const data = await readFile(dbPath, "utf-8");
    return JSON.parse(data);
}
exports.saveDB = async (db) => {
    const data = JSON.stringify(db, null, "  ");  //有回车换行 使用两个 空格 进行缩进
    await writeFile(dbPath, data)
}

