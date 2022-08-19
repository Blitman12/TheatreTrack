import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { actorActions } from 'src/core/project/state';
import { ProjectSelectors } from 'src/core/project/state/selectors';
import { Actor } from 'src/shared/models';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.scss'],
})
export class ActorComponent implements OnInit {
  public editActor!: FormGroup;
  public actor?: Actor = this.data?.actor ?? undefined;
  public actorFirstName = this.actor?.firstName ?? '';
  public actorLastName = this.actor?.lastName ?? '';
  public actorCurrentCharacter = this.actor?.currentCharacter ?? '';
  public actorAge = this.actor?.age ?? undefined;

  public get actorFirstNameValue(): AbstractControl | null {
    return this.editActor.get('actorFirstName');
  }

  public get actorLastNameValue(): AbstractControl | null {
    return this.editActor.get('actorLastName');
  }

  public get actorCurrentCharacterValue(): AbstractControl | null {
    return this.editActor.get('actorCurrentCharacter');
  }

  public get actorAgeValue(): AbstractControl | null {
    return this.editActor.get('actorAge');
  }

  public get title(): string {
    return this.data?.actor
      ? `Actor: ${this.data.actor.firstName} ${this.data.actor.lastName}`
      : 'New Actor';
  }

  public constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private _store: Store,
    private _projectSelectors: ProjectSelectors,
    private _formBuilder: FormBuilder,
    private _dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.editActor = this._formBuilder.group({
      actorFirstName: [this.actorFirstName],
      actorLastName: [this.actorLastName],
      actorCurrentCharacter: [this.actorCurrentCharacter],
      actorAge: [this.actorAge],
    });
  }

  public cancel(): void {
    this._dialog.closeAll();
  }

  public save(): void {
    const action = this.actor
      ? actorActions.requestEditActor({
          id: this.actor._id,
          firstName: this.actorFirstNameValue?.value,
          lastName: this.actorLastNameValue?.value,
          age: this.actorAgeValue?.value,
          currentCharacter: this.actorCurrentCharacterValue?.value,
        })
      : actorActions.requestAddActor({
          firstName: this.actorFirstNameValue?.value,
          lastName: this.actorLastNameValue?.value,
          age: this.actorAgeValue?.value,
          currentCharacter: this.actorCurrentCharacterValue?.value,
        });
    this._store.dispatch(action);
    this._dialog.closeAll();
  }
}
