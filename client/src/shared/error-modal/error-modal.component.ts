import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss']
})
export class ErrorModalComponent {

  public constructor(
    private _dialog: MatDialog
  ) { }

  public cancel(): void {
    this._dialog.closeAll();
  }

}
