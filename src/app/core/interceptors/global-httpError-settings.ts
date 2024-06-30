import { Injectable } from '@angular/core';

/**
 * global class for variables that can be accessed everywhere
 */
@Injectable()
export class GlobalHttpErrorSettings{
    constructor(){}

    public static FALSE_CREDENTIALS_STATUS = 400;
    public static SESSION_EXPIRED_STATUS = 401;
    public static OK_NOT_FOUND_STATUS = 234;

}