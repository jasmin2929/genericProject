import { Injectable } from '@angular/core';


type DisplayMode = 'default' |'maximized'


export interface ScreenState {

    mode: DisplayMode;
    showArea1:  Boolean;
    showArea2:  Boolean;
    showArea3:  Boolean = false;

/*
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

*/
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