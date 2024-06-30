import { Component, Input } from '@angular/core';
import { ScreenStateService } from '../screen-state.service';


@Component({
  selector: 'app-screen-search-top-body',
  templateUrl: './screen-top-body.component.html',
  styleUrls: ['./screen-top-body.component.css']
})
export class ScreenTopBodyComponent {
@Input() screenState!: ScreenStateService 

}
