import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../core/services/notification.service';
import { CsvSettings } from './csv-settings';
import { DataRow } from '../../features/abstract.search-page.component';
@Component({
  selector: 'app-csv',
  templateUrl: './csv.component.html',
  styleUrls: ['./csv.component.css']
})
export class CsvComponent implements OnInit {

  constructor(
    private translate: TranslateService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
  }

  /**
   * checks if file is csv file
   * @param {FileList} files input file from user
   * @returns if file input validate
   */
  fileInputValidator(files: FileList | null): boolean {
    var validate = true;
    //if file is selected again

    if (files) {
      var file = files.item(0);
      if (file?.type != CsvSettings.FILE_TYPE) {
        validate = false;
        setTimeout(() => {
          //TODO change name of translation to csv
          this.notificationService.openSnackBar(this.translate.instant("csv.notification.type"));
        });
      }
    }
    return validate;
  }         
  /**
   * checks if file is empty
   * @param data lines of csv file
   * @returns if file content validate
   */
  fileContentValidator(data: Array<string>) {
    var validate = true;
    //if file empty or only columns
    if (data.length == 0 || data.length == 1) {
      validate = false;
      setTimeout(() => {
        //TODO change name of translation to csv
        this.notificationService.openSnackBar(this.translate.instant("csv.notification.empty"));
      });
    }
    return validate;
  }
  /**
   * reads csv file and returns struct of columnList and rowList, when function is called in another funtion the function has to be async and the command should be opened with "await"
   * @param file input
   * @returns Promise which provide an easy way to execute asynchronous functions, resolve: success returns result, reject: fail returns error
   */
  readCSV(file: File | null | undefined): any {
    return new Promise((resolve,reject) => {
      var csvColumnList: string[] = [];
      var csvRowList: string[] = [];
      //File reader method
      let reader: FileReader = new FileReader();
      reader.readAsText(file!);
      reader.onload = () => {
        let csv: any = reader.result;
        let allTextLines: any[] = new Array();;
        allTextLines = csv.split("\n");

        //get columns
        let columnData = allTextLines[0].split(';');
        //if file not empty
        if (this.fileContentValidator(columnData) == true) {
          //push columns
          for (let j = 0; j < columnData.length; j++) {
            csvColumnList.push(columnData[j]);
          }
          //push rows
          for (let i = 1; i < allTextLines?.length-1; i++) {
            csvRowList.push(allTextLines[i].split(';'));
          }
          var result: any = {csvColumnList, csvRowList}
          resolve(result);
        }
      }
      reader.onerror = reject;
    });
  }

  /**
  * download data as csv file
  */
  downloadCSV(columns: any, rows: any): void{
    var header : string[] = [];
    //copy array for manipulating it
    for (var i = 0; i < columns.length; i++) {
      header.push(columns[i]);
    }
    //remove first element of header (checkbox column)
    header.splice(0,1);

    //instead of key-value pairs
    //convert js objects to JSON and seperate with ,
    const data = rows;
    const csv = data.map((row: DataRow) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName]))
        .join(',')
    );
    //adds header above rows
    csv.unshift(header.join(','));
    //needed for Blob
    const csvArray = csv.join('\r\n');
    
    const a = document.createElement('a');
    const blob = new Blob([csvArray], { type: CsvSettings.FILE_TYPE });
    const url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = CsvSettings.FILE_NAME;
    a.click();
    window.URL.revokeObjectURL(url);
  }

}
