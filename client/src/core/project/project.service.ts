import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, switchMap } from "rxjs";
import { environment } from "src/environments/environment";
import { Actor, Project } from "../../shared/models/index";

@Injectable({ providedIn: 'root' })
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

    public editProject(id: string, name?: string, heroImage?: string): Observable<boolean> {
        return this.ensureSuccess(this._http.put<HttpResponse<any>>(`${this._baseUrl}/projects/${id}`, {
            name,
            heroImage
        }));
    }

    public deleteProject(id: string): Observable<boolean> {
        return this.ensureSuccess(this._http.delete<HttpResponse<any>>(`${this._baseUrl}/projects/${id}`));
    }

    public getActors(): Observable<Actor[]> {
        return this._http.get<any>(`${this._baseUrl}/actors`).pipe(
            switchMap(response => {
                const actors = new Array<Actor>();
                if (response.length > 0) {
                    response.forEach((item: Actor) => {
                        actors.push(<Actor>item)
                    })
                }
                return of(actors)
            })
        )
    }

    public addActor(firstName: string, lastName: string, age: number, currentCharacter?: string): Observable<boolean> {
        return this.ensureSuccess(this._http.post<HttpResponse<any>>(`${this._baseUrl}/actors`, {
            firstName,
            lastName,
            age,
            currentCharacter
        }));
    }

    public editActor(id: string, firstName?: string, lastName?: string, age?: number, currentCharacter?: string): Observable<boolean> {
        return this.ensureSuccess(this._http.put<HttpResponse<any>>(`${this._baseUrl}/actors/${id}`, {
            firstName,
            lastName,
            age,
            currentCharacter
        }));
    }

    public deleteActor(id: string): Observable<boolean> {
        return this.ensureSuccess(this._http.delete<HttpResponse<any>>(`${this._baseUrl}/actors/${id}`));
    }


    public addScene(id: string, name: string): Observable<boolean> {
        return this.ensureSuccess(this._http.post<HttpResponse<any>>(`${this._baseUrl}/scene/act/${id}`, { name }));
    }


    public deleteAct(id: string): Observable<boolean> {
        return this.ensureSuccess(this._http.delete<HttpResponse<any>>(`${this._baseUrl}/act/${id}`));
    }


    private ensureSuccess(res: Observable<any>): Observable<boolean> {
        return res.pipe(
            switchMap(response => {
                if (response?.status === 200) {
                    return of(true)
                }
                return of(false);
            })
        );
    }
}
