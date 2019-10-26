import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CommentsComponent } from './comments/comments.component';
import { routing } from './app-routing';
import { HomeComponent } from './home/home.component';
import { ChildCommentsComponent } from './child-comments/child-comments.component';


@NgModule({
  declarations: [
    AppComponent,
    CommentsComponent,
    HomeComponent,
    ChildCommentsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
