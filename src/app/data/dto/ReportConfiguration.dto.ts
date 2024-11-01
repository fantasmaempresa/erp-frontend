import { EntityDto } from "o2c_core";

export interface ReportConfigurationDto extends EntityDto {
    data: {
        content?: [],
        lasted_related_report_id?: number
    };
    name_process: string;
    name_phase: string;
    project_id: number;
    process_id: number;
}