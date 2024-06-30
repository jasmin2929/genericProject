import { HttpClient,HttpXhrBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISearchService } from './interface.search.service';
import { Criteria } from '../../shared/util/service.util';




export enum MethodEndPoints {
  search,
  get,
  delete,
  getMatchingValues
}

@Injectable({
  providedIn: 'root' 
})
export class AbstractSearchService implements ISearchService {
  protected httpClient: HttpClient
  
  
  public methodEndPoints!:Map<MethodEndPoints,string>

  /**
  * lucee REST service for billing-services: Data Set, Data Set Query, Data Set File
  */

  constructor(){
    this.httpClient = new HttpClient(new HttpXhrBackend({ 
    build: () => new XMLHttpRequest() 
}));
  }
  //----------------------------------------------------------DATASET-------------------------------------------------------------------------------------------------

  private getUrl(ep:MethodEndPoints):string {
    let url = this.methodEndPoints.get(ep) || '';

    if (!url.length) throw new Error('Implementation error: method ' + ep + ' not supported since no end point defined by implementing class.');

    return url;
  }

  /**
  * sends a post request to lucee REST service to get data checklist
  */
  public search(orderBy?: any[], pkOnly?: boolean, criterias?: Criteria[]) {
    let url = this.getUrl(MethodEndPoints.search);


    //FormData is a set of key/value pairs 
    var payload: any = new FormData();
    payload.append('orderBy', JSON.stringify(orderBy));
    payload.append('pkOnly', pkOnly);
    console.log(JSON.stringify(criterias));
    payload.append('criterias', JSON.stringify(criterias));
//    return this.httpClient.post<any>("/rest/api/ws-admin/message/search", payload);
    return this.httpClient.post<any>(url, payload);
    
  }

  /**
  * sends a get request to lucee REST service to get single data set overview
  * @returns {searchLotResponse} returns SrQueryResponse struct
  */
  public get(id: number) {
    let url = this.getUrl(MethodEndPoints.get);


//    return this.httpClient.get<any>("/rest/api/ws-admin/message/get?id=" + id);
      return this.httpClient.get<any>(url + id);
  }

  /**
* sends a get request to lucee REST service to get single data entry overview
* @returns 
*/
  
  public delete(id: number) {
    let url = this.getUrl(MethodEndPoints.delete);
    return this.httpClient.delete<any>(url + id);
  }

 
  

  public getMatchingValues(column?: string, value?: string) {
    let url = this.getUrl(MethodEndPoints.getMatchingValues);


    //FormData is a set of key/value pairs 
    var payload: any = new FormData();
    payload.append('column2return', column);
    payload.append('str', value);

    return this.httpClient.post<any>(url, payload);
//    return this.httpClient.post<any>("/rest/api/ws-admin/message/getmatchingvalues", payload);
  }
  //-------------------------------------------------ACTIONS-DETAILS------------------------------------------------------------------------

}


/**
 * struct for HTTP response with matching data
 */
export interface DataLoadResponse {
  MSG: string;
  ROWS:Array<object>;
  COLUMNLIST: Array<string>;
  DURATION:string;
}

export interface ActionResponse {
  MSG: string;
  ROWS:Array<object>;
  COLUMNLIST: Array<string>;
  DURATION:string;
}


