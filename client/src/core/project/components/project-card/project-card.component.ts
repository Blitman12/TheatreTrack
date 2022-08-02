import { Component, Input } from '@angular/core';
import { Project } from 'src/shared/models';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent{
  @Input() 
  public project!: Project;
  public defaultImage = '/assets/images/defaultMusical.jpg';

  public get actors(): string {
    return this.project && this.project.actors && this.project.actors.length > 0
    ? this.project.actors.map(actor => `${actor.firstName} ${actor.lastName}`).join(', ')
    : 'No Actors'
  }
}
