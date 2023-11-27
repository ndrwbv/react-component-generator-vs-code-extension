import * as vscode from "vscode";
import { createReactComponentFolder } from "./features/createReactStyledFolder/createReactStyledFolder";
import { createStory } from "./features/createStory/createStory";

enum ALL_COMMAND {
  createReactStyledFolder = "extension.createReactStyledFolder",
  createSingleReactComponent = "extension.createSingleReactComponent",
  createRTKSlice = "extension.createRTKSlice",
  createStory = "extension.createStory",
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
  {
    id: ALL_COMMAND.createStory,
  },
];

const resolveCommand = (commandId: string, rootFolderPath: string) => {
  switch (commandId) {
    case ALL_COMMAND.createReactStyledFolder:
      return createReactComponentFolder(rootFolderPath);

    case ALL_COMMAND.createStory:
      return createStory(rootFolderPath);

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
