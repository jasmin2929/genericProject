import { Injectable,Output, EventEmitter } from '@angular/core';


type DisplayMode = 'default' |'maximized'

@Injectable()
export class ScreenStateService {
    mode: DisplayMode = 'default';
    showArea1:  Boolean = true;
    showArea2:  Boolean = false;
    showArea3:  Boolean = false;

    fxFlexArea1!: String;
    fxFlexArea2!: String;
    fxFlexArea3!: String;

    @Output() closeEvent = new EventEmitter<string>();

    constructor(){
        this.updateFlex();

    }


    private updateFlex(){
        this.fxFlexArea1=(this.showArea3 ? '20%' : (this.showArea2 ? '60%':'100%'));
        this.fxFlexArea2=(this.mode=='maximized'? '50%' : '40%');
        this.fxFlexArea3=(this.mode=='maximized'? '50%' : '40%');
    }
   openArea2(closeSubWindow:Boolean=true):void {
        this.showArea2 =true;
        if (this.showArea3 && closeSubWindow)
            this.showArea3 = false;  

        this.updateFlex(); 
    }

    closeArea2() {
        this.showArea2 =false;
        this.closeEvent.emit('area2')
        this.closeArea3();    
        this.updateFlex(); 
    }


    openArea3() {
        this.showArea3 = true;    
        this.updateFlex(); 
    }


    closeArea3() {
        this.showArea3 = false; 
        this.minimize();  
        this.closeEvent.emit('area3')
        this.updateFlex(); 
    }

    maximize() {
        this.mode='maximized';
        this.updateFlex(); 
    }
  
    minimize() {
        this.mode='default';
        this.updateFlex(); 
    }
}