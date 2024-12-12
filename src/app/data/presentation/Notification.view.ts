import { viewActions, viewLabel, viewMapTo } from "o2c_core";
import { NotificationsServiceV } from "../services";
import { RoleDto, UserDto } from "../dto";
import { DatePipe } from "@angular/common";

@viewActions({
    classProvider: NotificationsServiceV,
    actions: []
})
export class NotificationsView {

    @viewLabel('Titulo')
    @viewMapTo((notification: any) => notification.title)
    notification: any;

    @viewLabel('Mensaje')
    notification__message: any;

    @viewLabel('Fecha')
    @viewMapTo((value: any) => {
        const datePipe = new DatePipe('en-MX');
        return datePipe.transform(value, 'dd-MM-yyyy HH:mm:ss');
    })
    created_at?: Date;

    check: boolean;

    user_id: number

    role_id: number

    user: UserDto;

    role: RoleDto;

    constructor(
        notification: any,
        notification__message: any,
        check: boolean,
        user_id: number,
        role_id: number,
        user: UserDto,
        role: RoleDto,
        created_at?: Date,
    ) {
        this.notification = notification;
        this.notification__message = notification__message;
        this.created_at = created_at;
        this.check = check;
        this.user_id = user_id;
        this.role_id = role_id;
        this.user = user;
        this.role = role;

    }
}