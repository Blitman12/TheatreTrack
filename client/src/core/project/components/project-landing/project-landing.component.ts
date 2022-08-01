import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { BaseComponent } from "src/shared/bases/base.component";
import { Project } from "src/shared/models";
import { ProjectSelectors } from "../../state/selectors";


@Component({
    selector: 'app-project-landing',
    templateUrl: './project-landing.component.html',
    styleUrls: ['./project-landing.component.scss']
})
export class ProjectLandingComponent extends BaseComponent {
    public projects = new Array<Project>();
    public defaultImage = '/assets/images/defaultMusical.jpg';

    public constructor(
        private _store: Store,
        private _projectSelectors: ProjectSelectors,
        private _router: Router
    ) { 
        super();
        this.setupSubscriptions();
     };


    public handleProject(id: string): void {
        this._router.navigateByUrl(`project/${id}`)
    }

    private setupSubscriptions(): void {
        this._subscriptions.push(this._projectSelectors.projectInfo$.subscribe(projects => this.projects = projects))
    }
}