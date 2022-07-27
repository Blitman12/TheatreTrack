import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BaseComponent } from 'src/shared/bases/base.component';
import { Actor } from 'src/shared/models';
import { ProjectSelectors } from '../../state/selectors';

@Component({
  selector: 'app-project-actor',
  templateUrl: './project-actor.component.html',
  styleUrls: ['./project-actor.component.scss']
})
export class ProjectActorComponent extends BaseComponent implements OnInit {
  public actors: Actor[] = [];

  public constructor(
    private _store: Store,
    private _projectSelectors: ProjectSelectors
  ) { 
    super();
    this.setupSubscriptions();
  }

  public ngOnInit(): void {

  }

  private setupSubscriptions(): void {
    this._subscriptions.push(
      this._projectSelectors.actorInfo$.subscribe(actors => this.actors = actors)
    )
  }

}
