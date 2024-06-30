import { Component, Input,Output, Injectable, EventEmitter } from '@angular/core';
import { ScreenStateService } from '../screen-state.service';

@Component({
  selector: 'app-screen-search-area2',
  templateUrl: './screen-area2.component.html',
  styleUrls: ['./screen-area2.component.css']
})
export class ScreenArea2Component {
@Input() screenState!: ScreenStateService 
@Input() title!: string 



constructor() {};


}
