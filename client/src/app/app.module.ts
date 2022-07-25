import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingModule } from 'src/components/landing/landing.module';
import { ProjectModule } from 'src/components/project/project.module';
import { EffectsModule } from '@ngrx/effects';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LandingModule,
    MatIconModule,
    ProjectModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({
      name: 'TT - DevTools',
      maxAge: 50,
      actionsBlocklist: actionBlockList(),
      logOnly: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {}

function actionBlockList(): string[] {
  return [
    '@ngrx/store/init',
    '@ngrx/store/update-reducers',
    '@ngrx/router-store/navigated',
    '@ngrx/router-store/request',
    '@ngrx/router-store/navigation',
  ];
}
