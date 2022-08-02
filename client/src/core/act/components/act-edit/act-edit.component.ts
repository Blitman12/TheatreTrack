import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { projectActions } from 'src/core/project/state';
import { Actor } from 'src/shared/models';


@Component({
  selector: 'app-act-edit',
  templateUrl: './act-edit.component.html',
  styleUrls: ['./act-edit.component.scss']
})
export class ActEditComponent implements OnInit {
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
