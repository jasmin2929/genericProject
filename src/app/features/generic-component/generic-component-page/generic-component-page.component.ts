import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { Settings } from '../../../shared/Settings';
import { NotificationService } from '../../../core/services/notification.service';
import { Router } from '@angular/router';
import { GenericComponentSettings } from '../generic-component-settings';
import { TranslateService } from "@ngx-translate/core";
import { GenericAdminService } from '../../services/generic-admin.service';
import { AbstractSearchPageComponent } from '../../abstract.search-page.component';
import { InputConfig } from '../../../shared/ui/ui-input/ui-input.component';

@Component({
  selector: 'app-generic-component-page',
  templateUrl: './generic-component-page.component.html',
  styleUrl: './generic-component-page.component.css'
})


export class GenericComponentPage extends AbstractSearchPageComponent implements OnInit {

  override l10nPath:string="genericComponent";

  override searchColumnList:string[] = GenericComponentSettings.SEARCH_RESULT_COLUMN_LIST;


  //relatedLinks = [];

  override inputList:InputConfig[] = [
    {name:"typeCd",label:this.t("attributes","typeCd"),type:"string",autocomplete:true,value:null,criteriaName:"type_cd"},
    {name:"subTypeCd",label:this.t("attributes","subTypeCd"),type:"string",autocomplete:false,value:"Check Load Status",criteriaName:"sub_type_cd"},
    {name:"deviceUdcId",label:this.t("attributes","deviceUdcId"),type:"string",autocomplete:false, value:null,criteriaName:"device_udc_id"}
  ];

  
  override searchOrderBy = ["insert_time desc"];

  constructor(
    dialog: MatDialog,
    datePipe: DatePipe,
    notificationService: NotificationService,
    router: Router,
    settings: Settings,
    translate: TranslateService
  ) {
    super(dialog,datePipe,notificationService,router,settings,translate);
    this.searchService = new GenericAdminService();
     }

  override ngOnInit(): void {
    super.ngOnInit();
  }


/*
   openResultDetails(row, i) { 
  }
*/
  //TODO Abstract
  override onSearchResultEntryClick(event: any) { 

    super.onSearchResultEntryClick(event.row,event.index);
  }

  override onSearchResultOrderByClick(event: any) {
    if (event.active == "INSERT_BY_NAME") {
      event.active = "INSERT_BY";
    }
    else if (event.active == "LAST_UPD_BY_NAME") {
      event.active = "LAST_UPD_BY";
    }
    super.onSearchResultOrderByClick(event);
  }

/*
 getSingleDataEntryOverview() {
    this.service.getSingleDataSetOverview(this.singleDataCheckId!).subscribe(data => {
      if (Settings.isObjEmpty(data)) {
        //TODO
      }
      else {
        this.singleDataCheckRow = data || [];
        console.log(this.singleDataCheckRow);
      }


      //this.showDataSetList = false;
      this.showSingleDatacheck = true;

      //when changing current data set action/entry details should be at best refreshed
      //currently we just get the message "no matching entries"
      //alternative would be to close the action/entry details window, but it might be a lot
      //of movement happaning in the ui then
      this.noMatchingDataEntry = true;
      this.noMatchingDataAction = true;

      this.resetEntry();
      this.resetAction();
    })
  }


  }
*/
  override closeSearchResultDetails() {
    super.closeSearchResultDetails();
  }
/*
  override openSearchResultRelatedDetails() {
    super.openSearchResultRelatedDetails();
  }
  //TODO: reset value
  override closeSearchResultRelatedDetails() {
    super.closeSearchResultRelatedDetails();
//   this.resetAction();
  }
*/
}



