import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ProjectComponent } from 'src/core/project/components/project/project.component';
import { actorActions } from 'src/core/project/state';
import { ProjectSelectors } from 'src/core/project/state/selectors';
import { BaseComponent } from 'src/shared/bases/base.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent implements OnInit {
  public title = 'Theatre Track';
  public actorToggleState!: boolean;

  public constructor(
    private _dialog: MatDialog,
    private _projectSelectors: ProjectSelectors,
    private _store: Store
    ) { 
      super();
    }

  public ngOnInit(): void {
      this.setupSubscriptions();
  }

  public editPlay(): void {
    this._dialog.open(ProjectComponent);
  }

  public toggleActorBar(): void {
    this._store.dispatch(actorActions.toggleActorBar());
  }

  private setupSubscriptions() {
    this._subscriptions.push(
      this._projectSelectors.actorToggleState.subscribe(state => this.actorToggleState = state)
    )
  }
}
