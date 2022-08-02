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

import { actActions } from 'src/core/project/state';
import { Act } from 'src/shared/models';



@Component({
  selector: 'app-act',
  templateUrl: './act.component.html',
  styleUrls: ['./act.component.scss']
})
export class ActComponent implements OnInit {
  public editAct!: FormGroup;
  public act?: Act = this.data?.act ?? undefined;
  public actName = this.act?.name ?? '';

  public get actNameValue(): AbstractControl | null {
      return this.editAct.get('actName')
  }

  public get title(): string {
    return this.act ? `Edit: ${this.actName}` : 'New'
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
          actName: [this.actName]
      });
  }

  public cancel(): void {
      this._dialog.closeAll()
  }

  public save(): void {
    const action = this.act 
    ? actActions.requestEditAct({
        id: this.data.act._id,
        name: this.actNameValue?.value,
    })
    : actActions.requestAddAct({
        projectId: this.data.projectId,
        name: this.actNameValue?.value
    });
    this._store.dispatch(action)
    this._dialog.closeAll()
  }
}
