import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { createComponentToString } from "../../shared/utils/createComponentToString";
import { writeFile } from "../../shared/utils/writeFile";

export const createSingleReactComponent = async (rootFolderPath: string) => {
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

  const newFileName = `${componentName}.tsx`;
  if (fs.existsSync(path.join(folderPath, newFileName))) {
    vscode.window.showErrorMessage(`Story ${componentName} already exists.`);
    return null;
  }

  const fileData = await createComponentToString(
    "createSingleReactComponent",
    "ComponentName.tsx",
    componentName
  );

  await writeFile(fileData, newFileName, folderPath);
};
