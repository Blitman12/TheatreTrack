import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { BaseComponent } from "src/bases/base.component";
import { Project } from "src/models";
import { projectActions } from "../project/state";
import { ProjectSelectors } from "../project/state/selectors";

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})
export class LandingComponent extends BaseComponent implements OnInit {
    public projects = new Array<Project>();

    public constructor(
        private _store: Store,
        private _projectSelectors: ProjectSelectors
    ) { 
        super();
        this.setupSubscriptions();
     };

    public ngOnInit(): void {
        this._store.dispatch(projectActions.requestLoadProjects())
    }

    private setupSubscriptions(): void {
        this._subscriptions.push(this._projectSelectors.projectInfo$.subscribe(projects => this.projects = projects))
    }
}