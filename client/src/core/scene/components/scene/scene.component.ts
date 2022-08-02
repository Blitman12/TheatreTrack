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

import { sceneActions } from 'src/core/project/state';
import { Scene } from 'src/shared/models';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss']
})
export class SceneComponent implements OnInit {
  public editScene!: FormGroup;
  public scene?: Scene = this.data?.scene ?? undefined;

  public get sceneNameValue(): AbstractControl | null {
      return this.editScene.get('sceneName')
  }

  public get title(): string {
    return this.scene ? this.scene.name : 'New';
  }

  public constructor(
      @Inject(MAT_DIALOG_DATA)
      public data: any,
      private _dialog: MatDialog,
      private _formBuilder: FormBuilder,
      private _store: Store
  ) { }

  public ngOnInit(): void {
      this.editScene = this._formBuilder.group({
          sceneName: [this.scene?.name ?? '']
      });
  }

  public cancel(): void {
      this._dialog.closeAll()
  }

  public save(): void {
    const action = this.scene 
    ? sceneActions.requestEditScene({ id: this.scene._id, name: this.sceneNameValue?.value })
    : sceneActions.requestAddScene({ actId: this.data.actId, name: this.sceneNameValue?.value})
    this._store.dispatch(action);
    this._dialog.closeAll()
  }
}
