import { FormGroup } from "@angular/forms";

export interface PredefinedFormLifeCycle {
    next: (args?: { process_id: number; project_id: number; data: any }, callback?: Function) => void;
    prev: (args?: { process_id: number; project_id: number; data: any }, callback?: Function) => void;
    writeValue: (value: any) => void;
}