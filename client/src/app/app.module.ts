import { APP_INITIALIZER, NgModule } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';

import { actorActions, projectActions } from 'src/core/project/state';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from 'src/shared/shared.module';
import { ProjectModule } from 'src/core/project/project.module';
import { ActorModule } from 'src/core/actor/actor.module';
import { ActModule } from 'src/core/act/act.module';
import { SceneModule } from 'src/core/scene/scene.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedModule,
    HttpClientModule,
    ProjectModule,
    ActModule,
    SceneModule,
    ActorModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({
      name: 'TT - DevTools',
      maxAge: 50,
      actionsBlocklist: actionBlockList(),
      logOnly: environment.production,
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (store: Store) => {
        console.log('Running App Init');
        store.dispatch(projectActions.requestLoadProjects());
        store.dispatch(actorActions.requestLoadActors());
      },
      deps: [Store],
    },
  ],
  bootstrap: [AppComponent],
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
