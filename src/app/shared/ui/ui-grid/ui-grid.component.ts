import { Component, OnInit, Input, Output, Injectable, EventEmitter } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Settings } from '../../Settings';
import { StringUtil } from '../../util/string.util';


@Component({
  selector: 'app-ui-grid',
  templateUrl: './ui-grid.component.html',
  styleUrls: ['./ui-grid.component.css']
})
export class UiGridComponent implements OnInit {
  @Input() l10nPath!:string;
  @Input() paginatorConfig!:UiGridPaginatorConfig;
  @Input() dataSource!:MatTableDataSource<any>;
  @Input() userSelection = new SelectionModel<any>(true, []);
  @Input() dataSetColumnList!: string[];
  _dataSetColumnList!: string[];
  @Input() noMatchingRecord!: boolean;
  

  @Output() matSortChange = new EventEmitter();
  @Output() rowSelected = new EventEmitter();
  @Output() pageEvent = new EventEmitter<PageEvent>();


constructor(
    public settings: Settings
  ) {}

  ngOnInit(): void {

    if (this.dataSetColumnList != null) {
        this._dataSetColumnList = this.dataSetColumnList.slice();
        //adding select column
        if (!this._dataSetColumnList.includes("select"))
          this._dataSetColumnList.unshift("select");
    }
  }

  t(column:string) {
    return this.l10nPath + "." + StringUtil.underlineToCamelCase(column);
  }


  onMatSortChange(event: any) {
    this.matSortChange.emit(event)
  }

  onRowSelected(row: any,i: number) {
    this.rowSelected.emit({row:row,index:i})
  }

  onPageEvent(event:PageEvent) {
    this.paginatorConfig.pageEvent = event;
    this.paginatorConfig.length = event.length;
    this.paginatorConfig.pageSize = event.pageSize;
    this.paginatorConfig.pageIndex = event.pageIndex;

    this.pageEvent.emit(event)
  }

  /**
   * selects all rows if they are not all selected, otherwise clear selection
   */
  masterToggle() {
    this.isAllSelected() ?
      this.userSelection.clear() :
      this.dataSource.data.forEach(row => this.userSelection.select(row));
  }
   /**
  * whether the number of selected elements matches the total number of rows
  * @returns boolean if all checkboxes checked
  */
  isAllSelected() {
    const numSelected = this.userSelection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

}



@Injectable()
export class UiGridPaginatorConfig {


  length = Settings.PAGINATOR_LENGTH;
  pageSize = 15; //Settings.PAGINATOR_PAGE_SIZE;
  pageIndex = Settings.PAGINATOR_PAGE_INDEX;
  pageEvent!: PageEvent;
  hidden: boolean = true;

  //for dataset paginator template
  pageSizeOptions = Settings.PAGINATOR_PAGE_SIZE_OPTIONS;
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  constructor(){};

  getStartIndex():number {
    return this.pageIndex * this.pageSize;
  }

  getEndIndex():number {
    return Math.min((this.pageIndex + 1) * this.pageSize, this.length);
  }

}


