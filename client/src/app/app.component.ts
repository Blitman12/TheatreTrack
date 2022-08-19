import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs';
import { ProjectComponent } from 'src/core/project/components/project/project.component';
import { actorActions } from 'src/core/project/state';
import { ProjectSelectors } from 'src/core/project/state/selectors';
import {
  logoFadeAnimation,
  LogoFadeState,
} from 'src/shared/animations/logo-animation';
import { BaseComponent } from 'src/shared/bases/base.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [logoFadeAnimation],
})
export class AppComponent extends BaseComponent implements OnInit {
  public title = 'Theatre Track';
  public actorToggleState!: boolean;
  public url = '';
  public logoState = LogoFadeState.In;

  public constructor(
    private _dialog: MatDialog,
    private _projectSelectors: ProjectSelectors,
    private _router: Router,
    private _store: Store
  ) {
    super();
  }

  public ngOnInit(): void {
    this.setupSubscriptions();
    setInterval(() => {
      this.logoState =
        this.logoState === LogoFadeState.In
          ? LogoFadeState.Out
          : LogoFadeState.In;
    }, 1000);
  }

  public editPlay(): void {
    this._dialog.open(ProjectComponent);
  }

  public toggleActorBar(): void {
    this._store.dispatch(actorActions.toggleActorBar());
  }

  private setupSubscriptions() {
    this._subscriptions.push(
      this._projectSelectors.actorToggleState.subscribe(
        (state) => (this.actorToggleState = state)
      ),
      this._router.events
        .pipe(
          filter((event) => event instanceof NavigationStart),
          map((event) => event as NavigationStart)
        )
        .subscribe((event) => (this.url = event.url))
    );
  }
}
