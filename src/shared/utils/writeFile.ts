import * as path from "path";
import * as fs from "fs";
import * as vscode from "vscode";

export const writeFile = async (
  content: string,
  fileName: string,
  folderPath: string
): Promise<null> => {
  try {
    fs.promises.writeFile(path.join(folderPath, fileName), content);
  } catch (e) {
    vscode.window.showErrorMessage(JSON.stringify(e));
  }

  return null;
};
