import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
  title: string;
  message: string;
    /**
   * boolean if details exist
  */
  detailsExist = false;
  /**
   * details that can be opened
   */  
  detailsContent: string;
  /**
   * 2 options of dialog, mosty "yes" and "no"
   */
  option1: string;
  option2: string;

  /**
   * boolean if details opened
   */
  invisible = true;


  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel) {
      // public option1: string, public option2: string
    this.title = data.title;
    this.message = data.message;
    this.detailsExist = data.detailsExist;
    this.detailsContent = data.detailsContent;
    this.option1 = data.option1;
    this.option2 = data.option2;
  }

  /**
   * saves choice of user after closing dialog
   */
  onOption1(): void {
    this.dialogRef.close(this.option1);
  }
  /**
   * saves choice of user after closing dialog
   */
  onOption2(): void {
    this.dialogRef.close(this.option2);
  }
  /**
   * changes details boolean
   */
  toggleCollapse(): void {
    this.invisible = !this.invisible;
  }
  onClose(){
    this.dialogRef.close();
  }
}

/**
 * Class to represent the data of the ConfirmDialogComponent
 *
 * It has been kept here to keep it as part of shared component.
 */
export class ConfirmDialogModel {
  /**
   * @constructor
   * @param {string} title 
   * @param {string} message 
   * @param {boolean} detailsExist - if details exist 
   * @param {string} detailsContent - content of optional details view
   * @param {string} option1 - mostly "yes"
   * @param {string} option2 - mostly "no"
   */
  constructor(public title: string, public message: string, public detailsExist: boolean, public detailsContent: string, public option1: string, public option2: string) {
  }
}
