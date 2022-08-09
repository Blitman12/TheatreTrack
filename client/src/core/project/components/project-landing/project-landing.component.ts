import { Component } from "@angular/core";

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
        private _projectSelectors: ProjectSelectors,
    ) { 
        super();
        this.setupSubscriptions();
    };

    private setupSubscriptions(): void {
        this._subscriptions.push(this._projectSelectors.projectInfo$.subscribe(projects => this.projects = projects))
    }
}
