import { Criteria } from "../../shared/util/service.util";


export interface ISearchService {


  /**
  * sends a post request to lucee REST service to get data checklist
  */
  search(orderBy?: any[], pkOnly?: boolean, criterias?: Criteria[]):any;

  /**
  * sends a get request to lucee REST service to get single data set overview
  * @returns {searchLotResponse} returns SrQueryResponse struct
  */
  get(id: number):any

  /**
* sends a get request to lucee REST service to get single data entry overview
* @returns {searchLotResponse} returns SrQueryResponse struct
*/

  delete(id: any):any;
 

 
   getMatchingValues(column?: string, value?: string):any;
}




