import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';

import { BaseComponent } from 'src/shared/bases/base.component';

@Component({
  selector: 'app-project-setup',
  templateUrl: './project-setup.component.html',
  styleUrls: ['./project-setup.component.scss']
})
export class ProjectSetupComponent extends BaseComponent {
  public projectSetup!: FormGroup;

  public constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialog: MatDialog,
    ) {
    super();
  }

  public cancel(): void {
    this._dialog.closeAll()
  }
}
