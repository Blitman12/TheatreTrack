import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ProjectComponent } from 'src/core/project/components/project/project.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'Theatre Track';
  constructor(
    private _dialog: MatDialog,
    private _store: Store
    ) { }

  public editPlay(): void {
    this._dialog.open(ProjectComponent)
  }
}
