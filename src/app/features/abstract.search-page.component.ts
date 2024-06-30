import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { Settings } from '../shared/Settings';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from '../core/services/notification.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { TranslateService } from "@ngx-translate/core";
import { Criteria, ServiceUtil } from '../shared/util/service.util';
import { UiGridPaginatorConfig } from '../shared/ui/ui-grid/ui-grid.component';
import { InputConfig, InputLoader } from '../shared/ui/ui-input/ui-input.component';
import { ISearchService } from './services/interface.search.service';
import { ScreenStateService } from '../shared/screen/screen-state.service';


@Component({ template: '' }) 
export class AbstractSearchPageComponent implements OnInit {

  public l10nPath!: string;

  protected searchPaginatorConfig!:UiGridPaginatorConfig;
  protected screenState!:ScreenStateService;

  protected searchService!: ISearchService

  inputList!: Array<InputConfig>;
  inputByName: any = {};
  relatedLinks = [];
  
  //to be set by default by implementing class
  //i.e:  ["insert_time desc"];
  searchOrderBy!:Array<string>;


  noMatchingSearchResults: boolean = true;

  //search list
  searchDataSource!: MatTableDataSource<any>;
  searchColumnList!:string[];
  searchDataSourceIds!: any[]; 


  //property for checkboxes column
  userSelection = new SelectionModel<any>(true, []);
  selectedSearchItemId!:number;
  selectedSearchItemData={};


  //column of selected single data row (for visualization)
  selectedEntryRowName: string | undefined;
  
  constructor(
    private dialog: MatDialog,
    public datePipe: DatePipe,
    private notificationService: NotificationService,
    private router: Router,
    public settings: Settings,
    public translate: TranslateService

  ) {}

  ngOnInit(): void {
    this.searchDataSource = new MatTableDataSource<any>;
    this.screenState = new ScreenStateService();
    this.searchPaginatorConfig = new UiGridPaginatorConfig();

    //init search inputs
    this.inputList.forEach((input) =>  {
      this.inputByName[input.name]=input;
      if (input.autocomplete) {
        input.loader=new AutoInputLoader(this.searchService);
      }
    });
  }

  t(path:string,key:string):string {
    return this.l10nPath + (path ? "." + path : "") + "." + key;

  }


/*
  openResultDetails(row, i) { 
  }
*/
  //TODO abstract transation settings
  onSearchResultEntryClick(row: any, i: number) { 

    this.screenState.openArea2(true);

 //   this.selectedSearchItemId = row["ID"];

    this.searchService.get(row["ID"]).subscribe((data: string[][]) => {
      if (Settings.isObjEmpty(data)) {
        //TODO
      }
      else {
        this.selectedSearchItemData = data || {};
      }

      console.log(this.selectedSearchItemData.toString());
    });
  }

  onSearchResultOrderByClick(event: any) {
    this.searchOrderBy = [event.active + " " + event.direction];
    this.buildDataSearchCriterias();
  }


/**
  * sets paginator values and handles page events
  * @param e page event
  */
  handlePageEventData(e: PageEvent) {
    
    this.searchPaginatorConfig.pageEvent = e;
    this.searchPaginatorConfig.length = e.length;
    this.searchPaginatorConfig.pageSize = e.pageSize;
    this.searchPaginatorConfig.pageIndex = e.pageIndex;


    this.loadSearchResultList();
  }


/*
  openSearchResultRelatedDetails() {
    this.screenState.openArea3();

  }
  //TODO: reset value
  closeSearchResultRelatedDetails() {
    this.screenState.closeArea3();

//   this.resetAction();
  }
*/


  closeSearchResultDetails() {
    this.screenState.closeArea2();
  }





  /**
   * build json serialized array criterias for searchs search request
   */
  buildDataSearchCriterias():Array<any>  {
    var criteriasArray = new Array();

    this.inputList.forEach((item) =>  {
      let input = this.inputByName[item.name];
      ServiceUtil.pushCriteriaObject(input.criteriaName || input.name, input.value, criteriasArray);
    });

    this.getSearchResultList(criteriasArray);

    return criteriasArray;

  }
 


  //---------------------------------------------FUNCTIONS-COMMUNICATING-WITH-REST-SERVICE------------------------------------------------------------------------------------
  //loads first all primary keys of the search list and loads the full search list information only for pagesize
  getSearchResultList(criterias?: any[]) {
    this.searchService.search(this.searchOrderBy, true, criterias).subscribe((data: string[][]) => {
      if (Settings.isObjEmpty(data)) {
        this.noMatchingSearchResults = true;
        this.searchPaginatorConfig.hidden = true;
        setTimeout(() => {
          this.notificationService.openSnackBar(this.translate.instant("wsMonitoring.notification.nosearch"));
        });
      }
      else {
        //for checkbox column
        this.searchDataSourceIds = data || [];

        this.searchPaginatorConfig.length = this.searchDataSourceIds.length;
        this.searchPaginatorConfig.hidden = false;
        this.noMatchingSearchResults = false;

        this.loadSearchResultList();

      }
    })
  }
  
  loadSearchResultList() {
    let criterias: Criteria[] = []
    let startIndex = this.searchPaginatorConfig.getStartIndex();
    let endIndex = this.searchPaginatorConfig.getEndIndex();

    ServiceUtil.pushCriteriaObject("id", this.searchDataSourceIds.slice(startIndex, endIndex), criterias);
    this.searchService.search(this.searchOrderBy, false, criterias).subscribe((data: string[][])  => {
      if (Settings.isObjEmpty(data)) {
        this.noMatchingSearchResults = true;
        this.searchPaginatorConfig.hidden = true;
          this.notificationService.openSnackBar(this.translate.instant("wsMonitoring.notification.nosearch"));
      }
      else {
//        let array = ["select"];
        //set columnList for table inclusive select column
//        this.searchColumnList = array.concat(this.SEARCH_RESULT_COLUMN_LIST) || [];
        this.searchDataSource.data = data || [];
        this.userSelection.clear();

      }
    });
  }
}



export class AutoInputLoader implements InputLoader {
  service:ISearchService;

  constructor(service: ISearchService) {
    this.service = service;
  }

  load(column?: string, value?: string):any {
    return this.service.getMatchingValues(column, value);
  }
}

export interface DataRow {
  [key: string]: any; // Generic key-value pair to accommodate dynamic columns
}