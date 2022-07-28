import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { BaseComponent } from 'src/shared/bases/base.component';
import { Actor } from 'src/shared/models';
import { projectActions } from '../../state';
import { ProjectSelectors } from '../../state/selectors';
import { ProjectAddActorComponent } from '../project-add-actor/project-add-actor.component';

@Component({
  selector: 'app-project-actor',
  templateUrl: './project-actor.component.html',
  styleUrls: ['./project-actor.component.scss']
})
export class ProjectActorComponent extends BaseComponent implements OnInit {
  public actors: Actor[] = [];

  public constructor(
    private _store: Store,
    private _projectSelectors: ProjectSelectors,
    private _dialog: MatDialog,
  ) {
    super();
    this.setupSubscriptions();
  }

  public ngOnInit(): void {

  }

  public add(): void {
    this._dialog.open(ProjectAddActorComponent)
  }

  public edit(actor: Actor): void {
    console.log(actor)
  }

  public delete(actor: Actor): void {
    const confirmDelete = window.confirm('Delete Actor? There is not going back');
    if (confirmDelete) {
      this._store.dispatch(projectActions.requestDeleteActor({ id: actor._id }))
    }
    return;
  }

  private setupSubscriptions(): void {
    this._subscriptions.push(
      this._projectSelectors.actorInfo$.subscribe(actors => this.actors = actors)
    )
  }

}
