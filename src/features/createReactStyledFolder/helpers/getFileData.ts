import * as path from "path";
import * as fs from "fs";
import { removeFirstLine } from "./removeFirstLine";

export const getFileData = async (
  fileName: string,
  componentName: string
): Promise<string> => {
  const indexPath = path.join(
    __dirname,
    `../../../assets/templates/createReactStyledFolder/${fileName}`
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
