import { Default } from "../../enum/environment.enum";

export interface MachineLocalWatchdogPrintCallStack {
    extractMangedStack: Default.EXTRACT_MANGED_STACK;
}

export interface MachineLocalWatchdogFolderSizeWDWatchedFolders {
    path: string;
    size: number;
    file: boolean; // 1 or 0
    subFolder: boolean;
    readOnly: boolean;
}

// FolderName=[SizeInMB],[File will deleted for 1 or just monitored for 0],[SubFolder will be included for 1 or not for 0],[Read only files will be deleted for 1 not deleted for 0]** 
// <path>=<size>,
// C:\MANAGEDLOGS=1000,1,1,1