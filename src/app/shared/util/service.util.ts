import { Injectable } from '@angular/core';

@Injectable()
export class ServiceUtil {

    constructor(){}

	/**
   * creates struct object for request criteria
   * @param name 
   * @param value 
   * @param array 
   */
  static pushCriteriaOperationObject(name: string, value: any, operator: string|undefined, array: Criteria[]) {
    if (value != undefined && value != "") {
      array.push(new Criteria(name,value,operator));
    }
  }

  /**
   * creates struct object for request criteria
   * @param name 
   * @param value 
   * @param array 
   */
  static pushCriteriaObject(name: string, value: any, array: Criteria[]) {
    if (value != undefined && value != "") {
      array.push(new Criteria(name,value));
    }
  }
  
}

export class Criteria {

  name:string;
  value:any;
  operator:string|undefined;

  constructor(name:string,value:any, operator:string|undefined=undefined){
    this.name = name;
    this.value= value;
    this.operator = operator;
  }

  getObject() {
    return {name:this.name, value:this.value, operator:this.operator};
  }
}