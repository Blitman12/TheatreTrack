import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { debounceTime } from 'rxjs';
import { BaseComponent } from 'src/shared/bases/base.component';
import { Actor } from 'src/shared/models';
import { projectActions } from '../../state';
import { ProjectSelectors } from '../../state/selectors';
import { ProjectAddActorComponent } from '../project-add-actor/project-add-actor.component';
import { ProjectEditActorComponent } from '../project-edit-actor/project-edit-actor.component';

@Component({
  selector: 'app-project-actor',
  templateUrl: './project-actor.component.html',
  styleUrls: ['./project-actor.component.scss']
})
export class ProjectActorComponent extends BaseComponent implements OnInit {
  public actors: Actor[] = [];
  public selectedActors: Actor[] = [];
  public displayedActors: Actor[] = [];
  public searchForm!: FormGroup;

  public get searchedActors(): AbstractControl | null {
    return this.searchForm.get('searchActors')
  }

  public constructor(
    private _store: Store,
    private _projectSelectors: ProjectSelectors,
    private _dialog: MatDialog,
    private _formBuilder: FormBuilder
  ) {
    super();
    this.setupSubscriptions();
  }

  public ngOnInit(): void {
    this.searchForm = this._formBuilder.group({
      searchActors: ['']
    })
    this.searchForm.valueChanges.pipe(debounceTime(300)).subscribe(() => this.handleSearch())
  }


  public add(): void {
    this._dialog.open(ProjectAddActorComponent)
  }

  public edit(actor: Actor): void {
    this._dialog.open(ProjectEditActorComponent, {data: {actor}})
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
      this._projectSelectors.actorInfo$.subscribe(actors => this.handleInitialActors(actors)),
    )
  }

  private handleInitialActors(actors: Actor[]): void {
    this.actors = actors;
    this.displayedActors= actors;
  }

  private handleSearch(): void {
    this.selectedActors = [];
    this.actors.forEach(actor => {
      let searchString = `${actor.firstName}${actor.lastName}`.toLowerCase();
      const searchTerm = this.searchedActors?.value.toLowerCase();
      if (searchString.includes(searchTerm)) this.selectedActors.push(actor)
    })
    this.displayedActors = this.selectedActors
  }
}
