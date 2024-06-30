import { Injectable } from '@angular/core';


/**
 * global class for variables that can be accessed everywhere
 */
@Injectable()
export class CsvSettings{
    constructor(){}

    public static FILE_TYPE = "text/csv";
    public static FILE_NAME = "myFile.csv";

}