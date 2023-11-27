import * as path from "path";
import * as fs from "fs";

export const writeFile = async (
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
