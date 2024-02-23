import { EntityDto } from 'o2c_core';

export interface IsoDocumentationDto extends EntityDto {
    name: string;
    rule: string;
    description: string;
    file: string;
}