import * as vscode from "vscode";
import * as fs from "fs";
import { createComponentToString } from "../../shared/utils/createComponentToString";
import { writeFile } from "../../shared/utils/writeFile";
import { getComponentFolder } from "../../shared/utils/getComponentFolder";

export const createReactComponentFolder = async (rootFolderPath: string) => {
  const componentName = await vscode.window.showInputBox({
    prompt: "Enter component name",
  });

  if (!componentName) {
    return;
  }

  const componentFolder = getComponentFolder(rootFolderPath, componentName);

  if (!componentFolder) {
    return;
  }

  fs.mkdirSync(componentFolder);

  const templateFolder = "createReactStyledFolder";

  const reactComponentFileData = await createComponentToString(
    templateFolder,
    "ComponentName.tsx",
    componentName
  );
  const styledFileData = await createComponentToString(
    templateFolder,
    "ComponentName.styles.ts",
    componentName
  );

  await writeFile(
    reactComponentFileData,
    `${componentName}.tsx`,
    componentFolder
  );

  await writeFile(
    styledFileData,
    `${componentName}.styles.ts`,
    componentFolder
  );
};
