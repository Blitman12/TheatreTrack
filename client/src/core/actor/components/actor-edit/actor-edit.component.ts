import { 
  Component, 
  Inject, 
  OnInit
} from '@angular/core';
import { 
  AbstractControl,
  FormBuilder,
  FormGroup 
} from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { projectActions } from 'src/core/project/state';
import { ProjectSelectors } from 'src/core/project/state/selectors';

@Component({
  selector: 'app-actor-edit',
  templateUrl: './actor-edit.component.html',
  styleUrls: ['./actor-edit.component.scss']
})
export class ActorEditComponent implements OnInit {
  public editActor!: FormGroup;
  public actorFirstName = this.data.actor.firstName;
  public actorLastName = this.data.actor.lastName;
  public actorCurrentCharacter = this.data.actor.currentCharacter;
  public actorAge = this.data.actor.age;

  public get actorFirstNameValue(): AbstractControl | null {
    return this.editActor.get('actorFirstName')
  }

  public get actorLastNameValue(): AbstractControl | null {
    return this.editActor.get('actorLastName')
  }

  public get actorCurrentCharacterValue(): AbstractControl | null {
    return this.editActor.get('actorCurrentCharacter')
  }

  public get actorAgeValue(): AbstractControl | null {
    return this.editActor.get('actorAge')
  }
  public constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _store: Store,
    private _projectSelectors: ProjectSelectors,
    private _formBuilder: FormBuilder,
    private _dialog: MatDialog
    ) { }

  public ngOnInit(): void {
    this.editActor = this._formBuilder.group({
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
    this._store.dispatch(projectActions.requestEditActor({
      id: this.data.actor._id,
      firstName: this.actorFirstNameValue?.value,
      lastName: this.actorLastNameValue?.value,
      age: this.actorAgeValue?.value,
      currentCharacter: this.actorCurrentCharacterValue?.value
      }))
    this._dialog.closeAll()
  }
}
