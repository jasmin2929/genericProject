import { Injectable } from '@angular/core';
import moment from 'moment';


/**
 * global settings for variables and methods that can be accessed everywhere
 */
@Injectable()
export class Settings{
    constructor(){}

    public static PAGINATOR_LENGTH = 0;
    public static PAGINATOR_PAGE_SIZE = 10;
    public static PAGINATOR_PAGE_INDEX = 0;
    public static PAGINATOR_PAGE_SIZE_OPTIONS = [5, 10, 15, 20, 25, 50, 100];

    public static DIALOG_TOP = "65px";
    public static DIALOG_RIGHT = "0px";
    public static DIALOG_CLASS = "fullSheetDialog";
   
    public TIME_FORMAT = 'dd/MM/yyyy HH:mm';

    /**
     * checks if object is empty
     * @param obj 
     * @returns 
     */
    public static isObjEmpty (obj: any) {
        return Object.keys(obj).length === 0;
    }
    /**
     * checks if object is date
     * @param date 
     * @returns 
     */
    public isDate(myVar: any) {
        var isDate = false;
        if (this.isString(myVar)) {
          if (moment(myVar).isValid()) {
            isDate = true;
          }
        }
        return isDate;
    }

    public isString(myVar: any){
      var isString = false;
      if (typeof myVar === 'string'){
        isString = true;
      }
      return isString;
    }

    public isArray(myVar: any){
      var isArray = false;
      if (Array.isArray(myVar)){
        isArray = true;
      }
      return isArray;
    }

}