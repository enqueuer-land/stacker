import {remote} from 'electron';

export class FileDialog {
    public static async open(properties: Array<'openFile' | 'openDirectory' | 'multiSelections' | 'showHiddenFiles' |
        'createDirectory' | 'promptToCreate' | 'noResolveAliases' | 'treatPackageAsDirectory'> = ['openFile', 'multiSelections']): Promise<string[]> {
        const dialogReturnValue = await remote.dialog.showOpenDialog({properties});
        return dialogReturnValue.filePaths || [];
    }

    public static async showSaveDialog(name: string): Promise<string | undefined> {
        const dialogReturnValue = await remote.dialog.showSaveDialog({
            defaultPath: name,
            showsTagField: false,
        });
        return dialogReturnValue.filePath;
    }

}
