import * as vscode from "vscode";
import { createReactComponentFolder } from "./features/createReactStyledFolder";

enum ALL_COMMAND {
  createReactStyledFolder = "extension.createReactStyledFolder",
  createSingleReactComponent = "extension.createSingleReactComponent",
  createRTKSlice = "extension.createRTKSlice",
}

const ALL_COMMAND_LIST = [
  {
    id: ALL_COMMAND.createReactStyledFolder,
  },
  {
    id: ALL_COMMAND.createSingleReactComponent,
  },
  {
    id: ALL_COMMAND.createRTKSlice,
  },
];

const resolveCommand = (commandId: string, rootFolderPath: any) => {
  if (ALL_COMMAND.createReactStyledFolder === commandId) {
    return createReactComponentFolder(rootFolderPath);
  }

  return;
};

export function activate(context: vscode.ExtensionContext) {
  ALL_COMMAND_LIST.forEach((command) => {
    let disposable = vscode.commands.registerCommand(
      command.id,
      (callbacks) => {
        const { path } = callbacks;
        resolveCommand(command.id, path);
      }
    );

    context.subscriptions.push(disposable);
  });
}

export function deactivate() {}
