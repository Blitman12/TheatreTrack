import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/shared/bases/base.component';

@Component({
  selector: 'app-project-actor',
  templateUrl: './project-actor.component.html',
  styleUrls: ['./project-actor.component.scss']
})
export class ProjectActorComponent extends BaseComponent implements OnInit {

  public constructor() { 
    super();
  }

  public ngOnInit(): void {
  }

}
