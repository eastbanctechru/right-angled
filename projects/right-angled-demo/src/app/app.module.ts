/**
 * This module is the entry for your App when NOT using universal.
 *
 * Make sure to use the 3 constant APP_ imports so you don't have to keep
 * track of your root app dependencies here. Only import directly in this file if
 * there is something that is specific to the environment.
 */

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule } from '@angular/router';
import { RTModule } from 'right-angled';
import { DemoAppComponent } from './app.component';
import { routing } from './app.routing';
import { HeaderComponent } from './header/header.component';
import { QuickTourModule } from './quick-tour/quick-tour.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  bootstrap: [DemoAppComponent],
  declarations: [DemoAppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RTModule,
    RouterModule,
    SharedModule.forRoot(),
    routing,
    QuickTourModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: []
})
export class AppModule { }
