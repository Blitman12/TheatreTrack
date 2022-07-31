import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Actor } from 'src/shared/models';
import { projectActions } from '../../state';

@Component({
    selector: 'app-project-add-act',
    templateUrl: './project-add-act-new.component.html',
    styleUrls: ['./project-add-act-new.component.scss']
})
export class ProjectAddNewActComponent implements OnInit {
    public addAct!: FormGroup;
    public actName = "";

    public get actNameValue(): AbstractControl | null {
        return this.addAct.get('actName')
    }


    constructor(
        @Inject(MAT_DIALOG_DATA)
        public data: any,
        private _dialog: MatDialog,
        private _formBuilder: FormBuilder,
        private _store: Store
    ) { }

    ngOnInit(): void {
        this.addAct = this._formBuilder.group({
            actName: [this.actName]
        });
    }

    public cancel(): void {
        this._dialog.closeAll()
    }

    public save(): void {
        this._store.dispatch(projectActions.requestAddAct({
            id: this.data.project._id,
            name: this.actNameValue?.value,
        }))
        this._dialog.closeAll()
    }

}
