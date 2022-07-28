import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Actor } from 'src/shared/models';
import { projectActions } from '../../state';

@Component({
  selector: 'app-project-add-actor',
  templateUrl: './project-add-actor.component.html',
  styleUrls: ['./project-add-actor.component.scss']
})
export class ProjectAddActorComponent implements OnInit {
  public addActor!: FormGroup;
  public actorFirstName = "";
  public actorLastName = "";
  public actorCurrentCharacter = "";
  public actorAge = 16;

  public get actorFirstNameValue(): AbstractControl | null {
    return this.addActor.get('actorFirstName')
  }

  public get actorLastNameValue(): AbstractControl | null {
    return this.addActor.get('actorLastName')
  }

  public get actorCurrentCharacterValue(): AbstractControl | null {
    return this.addActor.get('actorCurrentCharacter')
  }

  public get actorAgeValue(): AbstractControl | null {
    return this.addActor.get('actorAge')
  }

  constructor(
    private _dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private _store: Store
  ) { }

  ngOnInit(): void {
    this.addActor = this._formBuilder.group({
      actorFirstName: [this.actorFirstName],
      actorLastName: [this.actorLastName],
      actorCurrentCharacter: [this.actorCurrentCharacter],
      actorAge: [this.actorAge]
    });
  }

  public cancel(): void {
    this._dialog.closeAll()
  }

  public save(): void {
    this._store.dispatch(projectActions.requestAddActor({
      firstName: this.actorFirstNameValue?.value,
      lastName: this.actorLastNameValue?.value,
      age: this.actorAgeValue?.value,
      currentCharacter: this.actorCurrentCharacterValue?.value
      }))
    this._dialog.closeAll()
  }

}
