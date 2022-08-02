import { 
  AbstractControl,
  FormBuilder, 
  FormGroup 
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { projectActions } from '../../state';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.scss']
})
export class ProjectAddComponent implements OnInit {
  public addPlay!: FormGroup;
  public playName = "";
  public playImage = "";

  public get playNameValue(): AbstractControl | null {
    return this.addPlay.get('playName')
  }

  public get playImageValue(): AbstractControl | null {
    return this.addPlay.get('playImage')
  }

  public constructor(
    private _dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private _store: Store
    ) { }

  public ngOnInit(): void {
    this.addPlay = this._formBuilder.group({
      playName: [this.playName],
      playImage: [this.playImage]
    });
  }

  public cancel(): void {
    this._dialog.closeAll()
  }

  public save(): void {
    this._store.dispatch(projectActions.requestAddProject({name: this.playNameValue?.value, heroImage: this.playImageValue?.value }))
    this._dialog.closeAll()
  }
}
