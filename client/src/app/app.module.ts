import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Store, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';

import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from 'src/shared/shared.module';
import { ProjectModule } from 'src/core/project/project.module';
import { projectActions } from 'src/core/project/state';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
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
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: (store: Store) => {
      console.log('Running App Init')
      store.dispatch(projectActions.requestLoadProjects())
    },
    deps: [Store],
   }],
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
