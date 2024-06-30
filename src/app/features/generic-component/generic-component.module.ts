
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CsvComponent } from '../../shared/csv/csv.component';
import { SharedModule } from '../../shared/shared.module';
import { DatePipe } from '@angular/common'
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { ScreenComponent } from '../../shared/screen/screen.component';
import { ScreenTopContainerComponent } from '../../shared/screen/screen-top-container/screen-top-container.component';
import { ScreenTopHeaderComponent } from '../../shared/screen/screen-top-header/screen-top-header.component';
import { ScreenTopBodyComponent } from '../../shared/screen/screen-top-body/screen-top-body.component';
import { ScreenArea1Component } from '../../shared/screen/screen-area1/screen-area1.component';
import { ScreenArea2Component } from '../../shared/screen/screen-area2/screen-area2.component';
import { ScreenArea3Component } from '../../shared/screen/screen-area3/screen-area3.component';
import { ScreenBottomContainerComponent } from '../../shared/screen/screen-bottom-container/screen-bottom-container.component';
import { UiInputComponent } from '../../shared/ui/ui-input/ui-input.component';
import { UiGridComponent } from '../../shared/ui/ui-grid/ui-grid.component';
import { UiTableObjectComponent } from '../../shared/ui/ui-table-object/ui-table-object.component';
import { GenericComponentPage } from './generic-component-page/generic-component-page.component';
import { GenericComponentRoutingModule } from './generic-component-routing.module';


@NgModule({
  declarations: [
    GenericComponentPage,
    ScreenComponent,
    ScreenTopContainerComponent,
    ScreenTopHeaderComponent,
    ScreenTopBodyComponent,
    ScreenArea1Component,
    ScreenArea2Component,
    ScreenArea3Component,
    ScreenBottomContainerComponent,
    UiInputComponent,
    UiGridComponent,
    UiTableObjectComponent
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    GenericComponentRoutingModule,
    //SplitterModule,
    //DividerModule
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
  ],
  providers: [CsvComponent, DatePipe]

})
export class GenericComponentModule { }
//HttpLoaderFactory function is required for AOT (ahead of time) compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}