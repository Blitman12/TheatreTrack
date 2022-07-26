import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ProjectAddComponent } from 'src/core/project/components/project-add/project-add.component';


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

  public handleModal(): void {
    this._dialog.open(ProjectAddComponent)
  }
}
