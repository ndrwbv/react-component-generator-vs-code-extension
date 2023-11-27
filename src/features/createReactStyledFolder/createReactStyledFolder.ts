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

  const indexFileData = await createComponentToString(
    templateFolder,
    "ComponentNameIndex.ts",
    componentName
  );
  const index2FileData = await createComponentToString(
    templateFolder,
    "check.tsx",
    componentName
  );
  const reactComponentFileData = await createComponentToString(
    templateFolder,
    "ComponentName.tsx",
    componentName
  );
  const styledFileData = await createComponentToString(
    templateFolder,
    "ComponentName.styles.tsx",
    componentName
  );

  await writeFile(indexFileData, "index.ts", componentFolder);
  await writeFile(index2FileData, "index2.ts", componentFolder);

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
