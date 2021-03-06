import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WorksComponent } from './views/works/works.component';
import { CategoriesComponent } from './views/categories/categories.component';
import { AddWorksComponent } from './views/add-works/add-works.component';
import {DataServiceService} from './service/data-service.service';

@NgModule({
  declarations: [
    AppComponent,
    WorksComponent,
    CategoriesComponent,
    AddWorksComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule
    ],
  providers: [DataServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
