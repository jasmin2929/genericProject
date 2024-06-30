import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISearchService } from './interface.search.service';
import { AbstractSearchService,MethodEndPoints } from './abstract.search.service';



@Injectable({
  providedIn: 'root' 
})
export class GenericAdminService extends AbstractSearchService implements ISearchService{

  /**
  * lucee REST service for billing-services: Data Set, Data Set Query, Data Set File
  */

  constructor(
   ) {
    super();
    this.methodEndPoints= new Map<MethodEndPoints,string>([
    [MethodEndPoints.search,"/rest/api/generic-admin/message/search"],
    [MethodEndPoints.get,"/rest/api/generic-admin/message/getbyid?id="],
    [MethodEndPoints.getMatchingValues,"/rest/api/generic-admin/message/getmatchingvalues"]
    ]);

  }
 
  //----------------------------------------------------------ACTIONS------------------------------------------------------------------------------------------------------

  /**
  * sends a post request to lucee REST service to categorize datasets
  */
  public resendAction(messageId: string) {
    //FormData is a set of key/value pairs 
    var payload: any = new FormData();
    payload.append('id', messageId);
    return this.httpClient.post<any>("/rest/api/generic-admin/message/resend", payload);
  }

 
  //-------------------------------------------------ENTRIES-DETAILS------------------------------------------------------------------------

  /**
* sends a post request to lucee REST service to get data set entry
*/
  public searchPeerMessages(orderBy?: any[], pkOnly?: boolean, criterias?: any[], fileCriteria?: boolean) {
    //FormData is a set of key/value pairs 
    var payload: any = new FormData();
    payload.append('orderBy', JSON.stringify(orderBy));
    payload.append('pkOnly', pkOnly);
    console.log(JSON.stringify(criterias));
    payload.append('criterias', JSON.stringify(criterias));
    payload.append('fileDownload', fileCriteria);

    return this.httpClient.post<any>("/rest/api/generic-admin/message/peer/search", payload);
  }

  

  /**
* sends a post request to lucee REST service to get data set entry
*/
  public searchResendActionLogs(orderBy?: any[], pkOnly?: boolean, criterias?: any[]) {
    //FormData is a set of key/value pairs 
    var payload: any = new FormData();
    payload.append('orderBy', JSON.stringify(orderBy));
    payload.append('pkOnly', pkOnly);
    console.log(JSON.stringify(criterias));
    payload.append('criterias', JSON.stringify(criterias));
    return this.httpClient.post<any>("/rest/api/generic-admin/message/resend/logs/search", payload);
  }
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

