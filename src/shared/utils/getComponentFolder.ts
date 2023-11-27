import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export const getComponentFolder = (
  rootFolderPath: string,
  componentName: string
): string | null => {
  let folderPath = rootFolderPath;

  if (!fs.lstatSync(rootFolderPath).isDirectory()) {
    folderPath = path.dirname(rootFolderPath);
  }

  const componentFolder = path.join(folderPath, componentName);

  if (fs.existsSync(componentFolder)) {
    vscode.window.showErrorMessage(`Folder ${componentName} already exists.`);
    return null;
  }

  return componentFolder;
};
