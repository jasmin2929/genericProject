import { Injectable } from '@angular/core';

/**
 * global class for variables that can be accessed everywhere
 */
@Injectable()
export class GenericComponentSettings{
    constructor(){}
    //id, name, description, columns, location, interttime, intertby, update..
    //ATTACHMENT_ID
    public static SEARCH_RESULT_COLUMN_LIST = ["ID", "TYPE_CD", "SUB_TYPE_CD", "STATUS_CD", "DEVICE_UDC_ID", "REQ_UUID",  "OPEN_TIME", "EXT_ID", "REQUEST_REASON_CD", "SVC_PT_UDC_ID"];
}

