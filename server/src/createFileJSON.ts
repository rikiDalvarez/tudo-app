import fs from "fs";
import path from "path";

const createFile = (filePath: string) => {
  const todo = path.join(__dirname, filePath, "todo.json");
  const done = path.join(__dirname, filePath, "done.json");

  if (!fs.existsSync(todo)) {
    fs.writeFileSync(todo, JSON.stringify([]));
  }

  if (!fs.existsSync(done)) {
    fs.writeFileSync(done, JSON.stringify([]));
  }
};

export default createFile;
