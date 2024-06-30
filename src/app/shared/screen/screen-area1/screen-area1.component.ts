import { Component, Input } from '@angular/core';
import { ScreenStateService } from '../screen-state.service';

@Component({
  selector: 'app-screen-search-area1',
  templateUrl: './screen-area1.component.html',
  styleUrls: ['./screen-area1.component.css']
})
export class ScreenArea1Component {
@Input() screenState!: ScreenStateService 

}
