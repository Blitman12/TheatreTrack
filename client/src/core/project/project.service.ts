import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, switchMap } from "rxjs";
import { environment } from "src/environments/environment";
import { Project } from "../../shared/models/index";

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

    public addProject(name: string, heroImage?: string): Observable<boolean> {
        return this.ensureSuccess(this._http.post<HttpResponse<any>>(`${this._baseUrl}/projects`, {
            name,
            heroImage
        }));
    }

    public deleteProject(id: string): Observable<boolean> {
        return this.ensureSuccess(this._http.delete<HttpResponse<any>>(`${this._baseUrl}/projects/${id}`));
    }

    private ensureSuccess(res: Observable<any>): Observable<boolean> {
        return res.pipe(
            switchMap(response => {
                if(response?.status === 200) {
                    return of(true)
                }
                return of(false);
            })
        );
    }
}
