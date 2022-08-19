import { Observable, of, switchMap } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Actor, Project } from '../../shared/models/index';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private _baseUrl = environment.apiUrl;

  constructor(private _http: HttpClient) {}

  public getProjects(): Observable<Project[]> {
    return this._http
      .get<any>(`${this._baseUrl}/projects`, { observe: 'response' })
      .pipe(
        switchMap((response) => {
          const projects = new Array<Project>();
          if (response.body.length > 0) {
            response.body.forEach((item: Project) => {
              projects.push(<Project>item);
            });
          }
          return of(projects);
        })
      );
  }

  public addProject(name: string, heroImage?: string): Observable<boolean> {
    return this.ensureSuccess(
      this._http.post<HttpResponse<any>>(
        `${this._baseUrl}/projects`,
        {
          name,
          heroImage,
        },
        { observe: 'response' }
      )
    );
  }

  public editProject(
    id: string,
    name?: string,
    heroImage?: string
  ): Observable<boolean> {
    return this.ensureSuccess(
      this._http.put<HttpResponse<any>>(
        `${this._baseUrl}/projects/${id}`,
        {
          name,
          heroImage,
        },
        { observe: 'response' }
      )
    );
  }

  public deleteProject(id: string): Observable<boolean> {
    return this.ensureSuccess(
      this._http.delete<HttpResponse<any>>(`${this._baseUrl}/projects/${id}`, {
        observe: 'response',
      })
    );
  }

  public getActors(): Observable<Actor[]> {
    return this._http
      .get<any>(`${this._baseUrl}/actors`, { observe: 'response' })
      .pipe(
        switchMap((response) => {
          const actors = new Array<Actor>();
          if (response.body.length > 0) {
            response.body.forEach((item: Actor) => {
              actors.push(<Actor>item);
            });
          }
          return of(actors);
        })
      );
  }

  public addActor(
    firstName: string,
    lastName: string,
    age: number,
    currentCharacter?: string
  ): Observable<boolean> {
    return this.ensureSuccess(
      this._http.post<HttpResponse<any>>(
        `${this._baseUrl}/actors`,
        {
          firstName,
          lastName,
          age,
          currentCharacter,
        },
        { observe: 'response' }
      )
    );
  }

  public pushActorToScene(
    sceneId: string,
    actorId: string
  ): Observable<boolean> {
    return this.ensureSuccess(
      this._http.put<HttpResponse<any>>(
        `${this._baseUrl}/scene/${sceneId}/addactor`,
        { actorId },
        { observe: 'response' }
      )
    );
  }

  public pullActorToScene(
    sceneId: string,
    actorId: string
  ): Observable<boolean> {
    return this.ensureSuccess(
      this._http.put<HttpResponse<any>>(
        `${this._baseUrl}/scene/${sceneId}/removeactor`,
        { actorId },
        { observe: 'response' }
      )
    );
  }

  public editActor(
    id: string,
    firstName?: string,
    lastName?: string,
    age?: number,
    currentCharacter?: string
  ): Observable<boolean> {
    return this.ensureSuccess(
      this._http.put<HttpResponse<any>>(
        `${this._baseUrl}/actors/${id}`,
        {
          firstName,
          lastName,
          age,
          currentCharacter,
        },
        { observe: 'response' }
      )
    );
  }

  public deleteActor(id: string): Observable<boolean> {
    return this.ensureSuccess(
      this._http.delete<HttpResponse<any>>(`${this._baseUrl}/actors/${id}`, {
        observe: 'response',
      })
    );
  }

  public addScene(id: string, name: string): Observable<boolean> {
    return this.ensureSuccess(
      this._http.post<HttpResponse<any>>(
        `${this._baseUrl}/scene/act/${id}`,
        { name },
        { observe: 'response' }
      )
    );
  }

  public editScene(id: string, name: string): Observable<boolean> {
    return this.ensureSuccess(
      this._http.put<HttpResponse<any>>(
        `${this._baseUrl}/scene/${id}`,
        { name },
        { observe: 'response' }
      )
    );
  }

  public deleteScene(id: string): Observable<boolean> {
    return this.ensureSuccess(
      this._http.delete<HttpResponse<any>>(`${this._baseUrl}/scene/${id}`, {
        observe: 'response',
      })
    );
  }

  public editAct(id: string, name: string): Observable<boolean> {
    return this.ensureSuccess(
      this._http.put<HttpResponse<any>>(
        `${this._baseUrl}/act/${id}`,
        { name },
        { observe: 'response' }
      )
    );
  }

  public deleteAct(id: string): Observable<boolean> {
    return this.ensureSuccess(
      this._http.delete<HttpResponse<any>>(`${this._baseUrl}/act/${id}`, {
        observe: 'response',
      })
    );
  }

  public addAct(id: string, name: string): Observable<boolean> {
    return this.ensureSuccess(
      this._http.post<HttpResponse<any>>(
        `${this._baseUrl}/act/project/${id}`,
        { name },
        { observe: 'response' }
      )
    );
  }

  private ensureSuccess(res: Observable<any>): Observable<boolean> {
    return res.pipe(
      switchMap((response) => {
        if (response?.status === 200) {
          return of(true);
        }
        return of(false);
      })
    );
  }
}
