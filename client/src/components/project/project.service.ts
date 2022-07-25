import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, switchMap, map, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { Project } from "src/models";

@Injectable({providedIn: 'root'})
export class ProjectService {
    private _baseUrl = environment.apiUrl;

    constructor(private _http: HttpClient) { }

    public getProjects(): Observable<Project[]> {
        return this._http.get<any>(`${this._baseUrl}/projects`).pipe(
            switchMap(response => {
                const projects = new Array<Project>();
                if (response.length > 0) {
                    response.forEach((item: Project) => {                   
                        projects.push(<Project>item)
                    })
                }
                return of(projects)
            })
        )
    }
}
