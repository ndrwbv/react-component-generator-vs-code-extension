import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import { getFileData } from "./helpers/getFileData";
import { writeFile } from "./helpers/writeFile";

export const createReactComponentFolder = async (rootFolderPath: string) => {
  const componentName = await vscode.window.showInputBox({
    prompt: "Enter component name",
  });

  if (!componentName) {
    return;
  }

  let folderPath = rootFolderPath;

  if (!fs.lstatSync(rootFolderPath).isDirectory()) {
    folderPath = path.dirname(rootFolderPath);
  }

  const componentFolder = path.join(folderPath, componentName);

  if (fs.existsSync(componentFolder)) {
    vscode.window.showErrorMessage(`Folder ${componentName} already exists.`);
    return;
  }

  fs.mkdirSync(componentFolder);

  const indexFileData = await getFileData("index.ts", componentName);
  const reactComponentFileData = await getFileData(
    "reactComponent.tsx",
    componentName
  );
  const styledFileData = await getFileData("styled.tsx", componentName);

  await writeFile(indexFileData, "index.ts", componentFolder);
  await writeFile(
    reactComponentFileData,
    `${componentName}.tsx`,
    componentFolder
  );
  await writeFile(
    styledFileData,
    `${componentName}.styles.tsx`,
    componentFolder
  );
};
