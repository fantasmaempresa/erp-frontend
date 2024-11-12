import { FormGroup } from "@angular/forms";

export interface PredefinedFormLifeCycle {
    nameProcess: string;
    namePhase: string;
    next: (args?: { process_id: number; project_id: number; data: any }, callback?: Function) => void;
    prev: (args?: { process_id: number; project_id: number; data: any }, callback?: Function) => void;
    writeValue: (value: any) => void;
    executeCommands: (commands: {command: string, args?: any, callback?: Function}) => void;
}