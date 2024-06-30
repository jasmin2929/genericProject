import { Component, Input , OnInit} from '@angular/core';
import { CollectionUtil } from '../../util/collection.util';
import { StringUtil } from '../../util/string.util';


@Component({
  selector: 'app-ui-table-object',
  templateUrl: './ui-table-object.component.html',
  styleUrls: ['./ui-table-object.component.css']
})


export class UiTableObjectComponent implements OnInit{  
  @Input() l10nPath!:string;
  @Input() record: any;
  @Input() columns!: number;
  @Input() attributeList!: string[];

  rows!:string[][];

  ngOnInit() {
      this.rows = CollectionUtil.arrayToSubArray(this.attributeList,this.columns);
  }

  t(attribute:string) {
    return this.l10nPath + "." + StringUtil.underlineToCamelCase(attribute);
  }

  getValue(attribute: string): any {  
    return this.record[attribute] || '';  
  }  
}
