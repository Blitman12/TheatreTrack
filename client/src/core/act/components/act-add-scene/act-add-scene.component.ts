import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { projectActions } from 'src/core/project/state';

@Component({
    selector: 'app-act-add-scene',
    templateUrl: './act-add-scene.component.html',
    styleUrls: ['./act-add-scene.component.scss']
})
export class ActAddSceneComponent implements OnInit {
    public addScene!: FormGroup;
    public sceneName = "";

    public get sceneNameValue(): AbstractControl | null {
        return this.addScene.get('sceneName')
    }

    constructor(
        @Inject(MAT_DIALOG_DATA)
        private _data: any,
        private _dialog: MatDialog,
        private _formBuilder: FormBuilder,
        private _store: Store
    ) { }

    ngOnInit(): void {
        this.addScene = this._formBuilder.group({
            sceneName: [this.sceneName]
        });
    }

    public cancel(): void {
        this._dialog.closeAll()
    }

    public save(): void {
        this._store.dispatch(projectActions.requestAddScene({ id: this._data.id, name: this.sceneNameValue?.value }))
        this._dialog.closeAll()
    }

}
