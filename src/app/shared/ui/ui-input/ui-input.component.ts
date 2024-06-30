import { Component, OnInit, Input,Output, forwardRef,EventEmitter } from '@angular/core';
import {FormControl} from '@angular/forms'
import { Observable, startWith, map } from 'rxjs';
import { Settings } from '../../Settings';


@Component({
  selector: 'app-ui-input',
  templateUrl: './ui-input.component.html',
  styleUrls: ['./ui-input.component.css']
  //required to avoid "No value accessor for form control" error
/*,
  providers: [     
  {       provide: NG_VALUE_ACCESSOR, 
        useExisting: forwardRef(() => UiInputComponent),
        multi: true     
  } 

  ]
*/


})

export class UiInputComponent implements OnInit{  

  @Input() config!:InputConfig;

  valueStore!:Set<any>;
  formControl!:FormControl;
  autoInput!:string;
  autoValueList!: Observable<string[]>;



/*in config  
  @Input() name: string;  
  @Input() label: string;  
  @Input() autocomplete:Boolean;
  @Input() criteriaName:string="";

  @Input() ngModel: any | undefined;;  
  @Input() options: string[] | null; // You can define a specific type for options  
*/ 

  @Output('ngModelChange') ngModelChange: EventEmitter<any> = new EventEmitter<any>();



  ngOnInit() {
    this.formControl = new FormControl('');
    this.valueStore = new Set<any>();
    if (this.config.autocomplete == true) {
      this.autoInput = this.config.name + "Auto";
      this.config.criteriaName= this.config.criteriaName || this.config.name;

      this.autoValueList = this.formControl.valueChanges.pipe(
        startWith(''),
        map(value => this._autoCompleteAttributeValueLoader(value || ''))
      );
    }

  }


  clearModel() {  
    this.config.value = undefined;  
  }  

  onModelChange(event: any) {
    this.ngModelChange.emit(event)   ;
  }

  private loadItemMatchingAtributeValues(value:string) {
    //assumption input.name = query column name
    let key = this.config.criteriaName || this.config.name;

    if (this.config.loader != undefined) {
    this.config.loader.load(key, value).subscribe((data: Set<any>) => {      

      this.valueStore = this.valueStore || new Set<any>();

      if (Settings.isObjEmpty(data)) {
          this.valueStore.clear();
      }
      else {
        this.valueStore = data;
      }
    });
    }

  }

  private _autoCompleteAttributeValueLoader(value:string):string[] {
    this.loadItemMatchingAtributeValues(value);
    //TODO ??? how does this work (asumed async)
    return [...this.valueStore];
  }





 

private _normalizeValue(value: string): string {
    return value.toString().toLowerCase().replace(/\s/g, '');
  }

} 

export interface InputLoader {

  load(column?: string, value?: string):any;
}


export interface InputConfig {
  label:string,
  name:string,
  type:string,
  autocomplete:boolean,
  value:any,
  criteriaName:string,
  loader?: InputLoader

/*
  constructor(
label:string,
  name:string,
  type:string,
  autocomplete:boolean,
  value:any,
  criteriaName:string,
  options: string[] = []
  )
  */
}