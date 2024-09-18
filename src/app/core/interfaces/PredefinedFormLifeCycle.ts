import { FormGroup } from "@angular/forms";

export interface PredefinedFormLifeCycle {
    next: () => void;
    prev: () => void;
    writeValue: (value: any) => void;
}