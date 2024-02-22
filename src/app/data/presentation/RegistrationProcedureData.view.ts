import { ViewActions, viewActions, viewCrud, viewLabel, viewMapTo } from 'o2c_core';
import { RegistrationProcedureDataService } from '../services/registration-procedure-data.service';
import { DEFAULT_ROUTE_CONFIGURATION } from 'src/app/core/constants/routes.constants';
import { DocumentDto, UserDto } from '../dto';
import { RegistrationProcedureDataDto } from '../dto/RegistrationProcedureData.dto';
import { MatDialog } from '@angular/material/dialog';
import { DialogPreviewPdfComponent } from 'src/app/shared/components/dialog-preview-pdf/dialog-preview-pdf.component';

const goToViewDocument = new ViewActions<RegistrationProcedureDataDto>(
    async ({ row, injector }) => {
        const document = row as RegistrationProcedureDataDto;
        const dialog = injector.get(MatDialog);
        dialog.open(DialogPreviewPdfComponent, {
            data: {
                name: document.inscription,
                file: document.url_file,
            },
        });
    },
    'visibility',
    {
        tooltip: 'Ver documento',
        color: 'accent',
        isVisible: (row: RegistrationProcedureDataDto) => row.url_file !== null,
    },

);

@viewActions({
    classProvider: RegistrationProcedureDataService,
    // registerName: 'Información de registro',
    actions: [
        ViewActions.ACTION_ADD('../new'),
        ViewActions.ACTION_DELETE(RegistrationProcedureDataService),
        goToViewDocument,
    ],
    // route: DEFAULT_ROUTE_CONFIGURATION,
})
export class RegistrationProcedureDataView {
    @viewLabel('Incripción')
    inscription: string;
    @viewLabel('Fojas')
    sheets: string;
    @viewLabel('Tomo')
    took: string;
    @viewLabel('Fecha')
    date: string;
    property: string;
    url_file: string;
    procedure_id: number;
    document_id: number;
    user_id: number;

    @viewLabel('Usuario')
    @viewMapTo((value: any) => value?.name)
    user: UserDto;

    @viewLabel('Documento')
    @viewMapTo((value: any) => value?.name)
    document: DocumentDto;

    @viewLabel('Comentario')
    description: string;


    constructor(
        inscription: string,
        sheets: string,
        took: string,
        date: string,
        property: string,
        url_file: string,
        procedure_id: number,
        document_id: number,
        user_id: number,
        user: UserDto,
        description: string,
        document: DocumentDto,
    ) {
        this.inscription = inscription;
        this.sheets = sheets;
        this.took = took;
        this.date = date;
        this.property = property;
        this.url_file = url_file;
        this.procedure_id = procedure_id;
        this.document_id = document_id;
        this.user_id = user_id;
        this.user = user;
        this.document = document;
        this.description = description;
    }
}
