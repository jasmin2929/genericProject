import { Injectable } from '@angular/core';


/**
 * global class for variables that can be accessed everywhere
 */
@Injectable()
export class LayoutSettings{
    constructor(){}

    public static ALL_LANGUAGES = ['en', 'de', 'fr', 'it'];
    public static DEFAULT_LANGUAGE = "en";
    public static PERMISSION_VALID= "x";
    public static CURRENT_LANGUAGE = "currentLanguage";

}