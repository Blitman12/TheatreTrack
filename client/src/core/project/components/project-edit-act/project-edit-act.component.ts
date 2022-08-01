import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Actor } from 'src/shared/models';
import { projectActions } from '../../state';


@Component({
  selector: 'app-project-edit-act',
  templateUrl: './project-edit-act.component.html',
  styleUrls: ['./project-edit-act.component.scss']
})
export class ProjectEditActComponent implements OnInit {
  public editAct!: FormGroup;
  public actName = "";

  public get actNameValue(): AbstractControl | null {
      return this.editAct.get('actName')
  }


  public constructor(
      @Inject(MAT_DIALOG_DATA)
      public data: any,
      private _dialog: MatDialog,
      private _formBuilder: FormBuilder,
      private _store: Store
  ) { }

  public ngOnInit(): void {
      this.editAct = this._formBuilder.group({
          actName: [this.data.act.name]
      });
  }

  public cancel(): void {
      this._dialog.closeAll()
  }

  public save(): void {
      this._store.dispatch(projectActions.requestEditAct({
          id: this.data.act._id,
          name: this.actNameValue?.value,
      }))
      this._dialog.closeAll()
  }

}
