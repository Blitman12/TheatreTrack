import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    private _formBuilder: FormBuilder,
    ) {
    super();
  }

  public cancel(): void {
    this._dialog.closeAll()
  }
}
