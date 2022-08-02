import { 
  AbstractControl, 
  FormBuilder, 
  FormGroup 
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { projectActions } from 'src/core/project/state';


@Component({
  selector: 'app-actor-add',
  templateUrl: './actor-add.component.html',
  styleUrls: ['./actor-add.component.scss']
})
export class ActorAddComponent implements OnInit {
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

  public constructor(
    private _dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private _store: Store
  ) { }

  public ngOnInit(): void {
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
