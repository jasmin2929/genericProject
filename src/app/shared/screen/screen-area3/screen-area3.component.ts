import { Component, Input } from '@angular/core';
import { ScreenStateService } from '../screen-state.service';

@Component({
  selector: 'app-screen-search-area3',
  templateUrl: './screen-area3.component.html',
  styleUrls: ['./screen-area3.component.css']
})
export class ScreenArea3Component {
@Input() screenState!: ScreenStateService 
@Input() title!: string 

}
