import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { createComponentToString } from "../../shared/utils/createComponentToString";
import { writeFile } from "../../shared/utils/writeFile";

export const createStory = async (rootFolderPath: string) => {
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

  if (fs.existsSync(path.join(folderPath, `${componentName}.stories.tsx`))) {
    vscode.window.showErrorMessage(`Story ${componentName} already exists.`);
    return null;
  }

  const storyFileData = await createComponentToString(
    "createStory",
    "ComponentName.stories.tsx",
    componentName
  );

  await writeFile(storyFileData, `${componentName}.stories.tsx`, folderPath);
};
