import { 
    Component, 
    Inject, 
    OnInit 
} from "@angular/core";
import { 
    AbstractControl, 
    FormBuilder, 
    FormGroup 
} from "@angular/forms";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Store } from "@ngrx/store";

import { Project } from "src/shared/models";
import { projectActions } from "../../state";


@Component({
    selector: 'app-project-edit',
    templateUrl: './project-edit.component.html',
    styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {
    public project!: Project;
    public editPlay!: FormGroup;
    public playName = "";
    public playImage = "";
    public defaultImage = '/assets/images/defaultMusical.jpg';

    public get playNameValue(): AbstractControl  | null {
        return this.editPlay.get('playName')
    }
    
    public get playImageValue(): AbstractControl | null {
        return this.editPlay.get('playImage')
    }

    public constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialog: MatDialog,
        private _store: Store,
        private _formBuilder: FormBuilder,
    ) {}

    
    public ngOnInit(): void {
        this.project = this.data.project;
        this.playImage = this.data.project.heroImage;
        this.playName = this.data.project.name;
        this.editPlay = this._formBuilder.group({
            playName: [this.playName],
            playImage: [this.playImage]
        });
    }

    public cancel(): void {
        this._dialog.closeAll()
    }
    
    public save(): void {
        this._store.dispatch(projectActions.requestEditProject({id: this.project._id, name: this.playNameValue?.value, heroImage: this.playImageValue?.value}))
        this._dialog.closeAll()
    }
}
