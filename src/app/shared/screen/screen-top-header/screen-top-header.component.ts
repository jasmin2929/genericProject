import { Component, Input } from '@angular/core';
import { ScreenStateService } from '../screen-state.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-screen-search-top-header',
  templateUrl: './screen-top-header.component.html',
  styleUrls: ['./screen-top-header.component.css']
})
export class ScreenTopHeaderComponent {
@Input() title:String = "";
@Input() screenState!: ScreenStateService 

}
