import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { Project } from 'src/shared/models';
import { projectActions } from '../../state';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  public project?: Project = this.data?.project ?? undefined;
  public editPlay!: FormGroup;
  public name = this.project?.name ?? '';
  public heroImage = this.project?.heroImage ?? '';
  public defaultImage = '/assets/images/defaultMusical.jpg';

  public get playNameValue(): AbstractControl | null {
    return this.editPlay.get('playName');
  }

  public get playImageValue(): AbstractControl | null {
    return this.editPlay.get('playImage');
  }

  public get title(): string {
    return this.project ? `Edit ${this.name}` : 'New Play';
  }

  public constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialog: MatDialog,
    private _store: Store,
    private _formBuilder: FormBuilder
  ) {}

  public ngOnInit(): void {
    this.editPlay = this._formBuilder.group({
      playName: [this.name],
      playImage: [this.heroImage],
    });
  }

  public cancel(): void {
    this._dialog.closeAll();
  }

  public save(): void {
    const action = this.project
      ? projectActions.requestEditProject({
          id: this.project._id,
          name: this.playNameValue?.value,
          heroImage: this.playImageValue?.value,
        })
      : projectActions.requestAddProject({
          name: this.playNameValue?.value,
          heroImage: this.playImageValue?.value,
        });
    this._store.dispatch(action);
    this._dialog.closeAll();
  }
}
