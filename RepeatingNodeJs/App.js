//! Readline module that we use to console.log() like te
//! Reading and writing the files like by using the fs module.exports
const fs = require("fs");
//* thats the method which not follows the not sync method
// fs.readFile("./files/input.txt", "utf-8", (err, data) => {
//   console.log(data);
// });
// * this is the method for Sync file reading
const inputData = fs.readFileSync("./files/input.txt", "utf-8");
let content = `The Data i read from the File Input.txt : ${inputData}`;
fs.writeFileSync("./files/writingFile.txt", content, "utf-8");
//Todo These methods are for the
