import { Component } from '@angular/core';
import { Injectable } from '@angular/core';


type DisplayMode = 'default' |'maximized'

@Component({
  selector: '',
  templateUrl: '',
  styleUrls: []
})
export class ScreenStateComponent {

    public mode: DisplayMode = 'default';
    public showArea1:  Boolean = true;
    public showArea2:  Boolean = false;
    public showArea3:  Boolean = false;

    constructor(){}
    
    openArea2(closeSubWindow:Boolean=true):void {
        this.showArea2 =true;
        if (this.showArea3 && closeSubWindow)
            this.showArea3 = false;    
    }

    closeArea2() {
        this.screenState.showArea2 =false;
        this.screenState.showArea3 = false;    
    }


    openArea3() {
        this.screenState.showArea3 = true;    
    }


    closeArea3() {
        this.screenState.showArea3 = false;    
    }

    maximize() {
        this.screenState.mode='maximized';
    }
  
    minimize() {
        this.screenState.mode='default';
    }


/*
openResultRelatedDetails() {
    if (this.screenState.showArea2 == true) {
      this.closeResultDetails();
    }
    //no filters

  }

  closeSearchResultDetails() {
    this.screenState.mode = 'default';
    this.screenState.showArea1 = true;
    this.screenState.showArea2 =false;
    this.screenState.showArea3 = false;

    //reset values
  }

  closeResultDetails() {
    this.screenState.showArea2 = false;
    this.screenState.showArea3 = false;
    this.screenState.mode = 'default';

    //reset values
 //   this.resetEntry();
  }


  maxDetailArea() {
    this.screenState.mode='maximized';
  }
  minDetailArea() {
    this.screenState.mode='default';
  }


  //TODO: reset value
  closeResultRelatedDetails() {
    this.screenState.showArea3 = false;
    this.screenState.mode='default';

//   this.resetAction();
  }
*/
}