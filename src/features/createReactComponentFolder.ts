import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import { templateForReactComponent } from "../templates/templateForReactComponent";
import { templateForStyledComponent } from "../templates/templateForStyledComponent";
import { templateForIndexFile } from "../templates/templateForIndexFile";

export const createReactComponentFolder = async (rootFolderPath: string) => {
  const componentName = await vscode.window.showInputBox({
    prompt: "Enter component name",
  });

  if (!componentName) {
    return;
  }

  const folderPath = path.join(rootFolderPath, componentName);

  if (fs.existsSync(folderPath)) {
    vscode.window.showErrorMessage(`Folder ${componentName} already exists.`);
    return;
  }

  fs.mkdirSync(folderPath);

  fs.writeFileSync(
    path.join(folderPath, `${componentName}.tsx`),
    templateForReactComponent(componentName)
  );

  fs.writeFileSync(
    path.join(folderPath, `${componentName}.styles.tsx`),
    templateForStyledComponent(componentName)
  );

  fs.writeFileSync(
    path.join(folderPath, `${componentName}.ts`),
    templateForIndexFile(componentName)
  );
};
