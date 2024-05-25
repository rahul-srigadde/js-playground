const fs = require("fs");
const { filesInobject } = require("./log.js");

const filePath = {
  array: "/Users/rsrigadd/personal/playground/programs/Arrays/",
  backtracking: "/Users/rsrigadd/personal/playground/programs/Backtracking/",
  binarysearch: "/Users/rsrigadd/personal/playground/programs/binarySearch/",
  graph: "/Users/rsrigadd/personal/playground/programs/Graphs/",
  heap: "/Users/rsrigadd/personal/playground/programs/Heaps",
  recursion: "/Users/rsrigadd/personal/playground/programs/Recursion/",
  sorts: "/Users/rsrigadd/personal/playground/programs/sorts/",
  dp: "/Users/rsrigadd/personal/playground/programs/DynamicPrograming/",
};
class GenerateFileSystem {
  constructor(directoryPath) {
    this.path = directoryPath;
    this.numberOffiles = this.findNumberOfFiles(directoryPath);
  }
  getFilesName() {
    const path = this.path.slice(0, this.path.length - 1);
    const files = fs.readdirSync(path);
    fs.writeFile("./log.json", JSON.stringify(files), (err) => {
      if (err) {
        console.error("Error creating file:", err);
        return;
      }
      console.log("File created successfully  for str!");
    });
    return files;
  }
  findNumberOfFiles(directoryPath) {
    const path = directoryPath.slice(0, directoryPath.length - 1);
    const files = fs.readdirSync(path);
    return files.length;
  }
  createPathFromString(str, createmode = false) {
    if (createmode) this.numberOffiles++;
    str = str.replace(/\s+/g, "");
    str = str.charAt(0).toLowerCase() + str.slice(1) + ".js";
    return this.path + this.numberOffiles + "_" + str;
  }
  createFile(str) {
    const file = this.createPathFromString(str, true);
    fs.writeFile(file, str, (err) => {
      if (err) {
        console.error("Error creating file:", err);
        return;
      }
      console.log("File created successfully  for str!");
    });
  }

  modifyContent(string) {
    const file = this.createPathFromString(string);
    fs.readFile(file, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return;
      }

      const lines = data.split("\n");
      const modifiedLines = [
        "/**",
        ...lines.map((line) => ` * ${line}`),
        " */",
      ];

      const modifiedContent = modifiedLines.join("\n");
      fs.writeFile(file, modifiedContent, (err) => {
        if (err) {
          console.error("Error writing to file:", err);
          return;
        }
        console.log("File modified successfully!");
      });
    });
  }
  createfileNameAndRenameFile() {
    const arr = Object.entries(filesInobject);
    arr.forEach((element) => {
      const [name, num] = element;
      const str = num + "_" + name.slice(0, 1).toLowerCase() + name.slice(1);
      const oldPath = this.path + name;
      const newPath = this.path + str;
      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          console.error("Error renaming file:", err);
        } else {
          console.log("File renamed successfully.");
        }
      });
    });
  }
}

function driverFn(createmode = false) {
  let inputString = "Partitions With Given Difference";
  const fileSys = new GenerateFileSystem(filePath.dp);

  // const files = fileSys.getFilesName();
  // fileSys.createfileNameAndRenameFile();

  createmode && fileSys.createFile(inputString);
  !createmode && fileSys.modifyContent(inputString);
}

driverFn(!true);
