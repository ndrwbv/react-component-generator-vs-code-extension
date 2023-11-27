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

  const indexFileData = await createComponentToString(
    "createReactStyledFolder",
    "ComponentNameIndex.ts",
    componentName
  );
  const reactComponentFileData = await createComponentToString(
    "createReactStyledFolder",
    "ComponentName.tsx",
    componentName
  );
  const styledFileData = await createComponentToString(
    "createReactStyledFolder",
    "ComponentName.styles.tsx",
    componentName
  );

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
