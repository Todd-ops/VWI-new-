import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { SearchDocComponent } from './search-doc/search-doc.component';
import { ViewDocComponent } from './view-doc/view-doc.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from './material/material.module';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DropListsComponent } from './view-doc/drop-lists/drop-lists.component';
import { DocListComponent } from './view-doc/doc-list/doc-list.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/search-doc', pathMatch: 'full'},
  { path: 'search-doc', component: SearchDocComponent }, 
  { path: 'view-doc', component: ViewDocComponent},
  { path: 'view-doc/:docId', component: ViewDocComponent},
  { path: 'view-doc/:docLinkID', component: ViewDocComponent},
  { path: 'doc-list/:docId', component: ViewDocComponent},
  { path: 'doc-list/:docLinkID', component: ViewDocComponent}
]
  // { path: 'view-doc', 
  //   component: ViewDocComponent,
  //   children: [
  //   {
  //     path: 'view-doc/:docId', 
  //     component: DocListComponent,
  //   }]
  // }]
  //   {
  //     path: 'doc-list/:docId', 
  //     component: ViewDocComponent,
  //   },
  //   {
  //     path: 'doc-list/:docLinkID', 
  //     component: ViewDocComponent,
  //   }]
  // },
  // { path: 'view-doc/:docId', component: DocListComponent},
  // { path: 'doc-list/:docId', component: ViewDocComponent},
  // { path: 'doc-list/:docLinkID', component: ViewDocComponent}
  // { path: '**', component: PageNotFoundComponent } //Page for wildcard routing = 404 error handler TODO

  

@NgModule({
  declarations: [			
    AppComponent,
      HeaderComponent,
      SearchDocComponent,
      ViewDocComponent,
      DropListsComponent,
      DocListComponent
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'top'
    }),
    MaterialModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MaterialModule,
    MatDividerModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
