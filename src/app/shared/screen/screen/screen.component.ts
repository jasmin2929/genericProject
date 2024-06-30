import { Component, Input } from '@angular/core';
import { ScreenStateService } from 'src/app/shared/screen/screen-state.service';


@Component({
  selector: 'app-screen-search',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.css']
})
export class ScreenComponent {
  @Input() screenState: ScreenStateService 

}
