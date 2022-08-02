import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { projectActions } from 'src/core/project/state';

@Component({
  selector: 'app-act-edit-scene',
  templateUrl: './act-edit-scene.component.html',
  styleUrls: ['./act-edit-scene.component.scss']
})
export class ActEditSceneComponent implements OnInit {
  public editScene!: FormGroup;
  public sceneName = "";

  public get sceneNameValue(): AbstractControl | null {
      return this.editScene.get('sceneName')
  }

  constructor(
      @Inject(MAT_DIALOG_DATA)
      public data: any,
      private _dialog: MatDialog,
      private _formBuilder: FormBuilder,
      private _store: Store
  ) { }

  ngOnInit(): void {
      this.editScene = this._formBuilder.group({
          sceneName: [this.data.scene.name]
      });
  }

  public cancel(): void {
      this._dialog.closeAll()
  }

  public save(): void {
      this._store.dispatch(projectActions.requestEditScene({ id: this.data.scene._id, name: this.sceneNameValue?.value }))
      this._dialog.closeAll()
  }
}
