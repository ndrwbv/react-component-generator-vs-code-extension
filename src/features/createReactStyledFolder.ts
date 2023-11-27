import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
//rejected promise not handled within 1 second: Error: ENOTDIR: not a directory, mkdir '/Users/ab/Desktop/courier-shift-summary/src/entities/CourierComment/comn.tsx/sdfs'

const removeFirstLine = (value: string): string => {
  const valueArr = value.split("\n");
  valueArr.shift();
  return valueArr.join("\n");
};

const getFileData = async (
  fileName: string,
  componentName: string
): Promise<string> => {
  const indexPath = path.join(
    __dirname,
    `../../../assets/templates/reactStyledFolder/${fileName}`
  );
  let result = "";

  try {
    const parsedFile = await fs.promises.readFile(indexPath);
    const withFirstLineRemoved = removeFirstLine(parsedFile.toString());
    result = withFirstLineRemoved.replaceAll("ComponentName", componentName);
  } catch (e) {
    console.log(e);
  }

  return result;
};

const writeFile = async (
  content: string,
  fileName: string,
  folderPath: string
): Promise<null> => {
  try {
    fs.promises.writeFile(path.join(folderPath, fileName), content);
  } catch (e) {
    console.error(e);
  }

  return null;
};

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
    console.log("Is directory", folderPath);
  }

  const componentFolder = path.join(folderPath, componentName);

  if (fs.existsSync(componentFolder)) {
    vscode.window.showErrorMessage(`Folder ${componentName} already exists.`);
    return;
  }

  console.log(folderPath, componentFolder);
  fs.mkdirSync(componentFolder);

  const indexFileData = await getFileData("index.ts", componentName);
  const reactComponentFileData = await getFileData(
    "reactComponent.tsx",
    componentName
  );
  const styledFileData = await getFileData("styled.tsx", componentName);

  await writeFile(indexFileData, "index.ts", componentFolder);
  await writeFile(reactComponentFileData, `${componentName}.tsx`, componentFolder);
  await writeFile(styledFileData, `${componentName}.styles.tsx`, componentFolder);
};
