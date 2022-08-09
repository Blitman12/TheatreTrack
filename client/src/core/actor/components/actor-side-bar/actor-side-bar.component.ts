import { 
  AbstractControl, 
  FormBuilder, 
  FormGroup 
} from '@angular/forms';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { debounceTime } from 'rxjs';

import { actorActions } from 'src/core/project/state';
import { ProjectSelectors } from 'src/core/project/state/selectors';
import { BaseComponent } from 'src/shared/bases/base.component';
import { Actor } from 'src/shared/models';
import { ActorComponent } from '../actor/actor.component';

@Component({
  selector: 'app-actor-side-bar',
  templateUrl: './actor-side-bar.component.html',
  styleUrls: ['./actor-side-bar.component.scss']
})
export class ActorSideBarComponent extends BaseComponent implements OnInit {
  public opened = true;
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

  public bulkAdd(): void {
    console.log('Bulk add was clicked');
  }

  public clearText(): void {
    this.searchForm.patchValue({searchActors: ''})
  }

  public edit(actor?: Actor): void {
    this._dialog.open(ActorComponent, {data: {actor}})
  }

  public delete(actor: Actor): void {
    const confirmDelete = window.confirm('Delete Actor? There is not going back');
    if (confirmDelete) {
      this._store.dispatch(actorActions.requestDeleteActor({ id: actor._id }))
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
