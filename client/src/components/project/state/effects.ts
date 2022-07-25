import { catchError, of, switchMap, map } from "rxjs";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { projectActions } from ".";
import { ProjectService } from "../project.service";
import { Project, Actor } from "src/models";



@Injectable({providedIn: 'root'})
export class ProjectEffects {
    requestProjects$ = createEffect(() => this._actions$.pipe(
        ofType(projectActions.requestLoadProjects),
        switchMap(() => this._projectService.getProjects().pipe(
            map((projects) => projectActions.loadProjectSuccess({projects})),
            catchError((error) => of(projectActions.loadProjectFailure()))
        ))
    ))

    public constructor(
        private _store: Store,
        private _actions$: Actions,
        private _projectService: ProjectService
    ) { }

    private handleGetProjectsResponse(response: any) {
        let projects = new Array<Project>();
        if (response.length > 0) {
            response.map((item: any) => {
                projects.push({ ...item } as Project)
            })
            // response.forEach((proj: any) => {
            //     projects.push({
            //         actors: proj.actors,


            //     } as Project)
            // })
        }
        return projectActions.loadProjectSuccess({projects})
    }
}