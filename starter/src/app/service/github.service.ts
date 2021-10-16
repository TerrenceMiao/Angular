import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap} from 'rxjs/operators';

import { GitHubRepository } from '../model/github.repository';

import { environment } from '../../environments/environment';

@Injectable()
export class GitHubService {

  constructor(private http: HttpClient) {
  }

  getRepos(username: string): Observable<GitHubRepository[]> {
    // The https://api.github.com/users/<username>?repos endpoint returns the list of
    // Repositories belonging to the user <userName>
    // return this.http.get<repos[]>(`${environment.gitHubApi}/users/` + userName + '/repos', { observe: 'events', reportProgress: true })
    // return this.http.get<repos[]>(`${environment.gitHubApi}/users/` + userName + '/repos', { observe: 'response' })
    return this.http.get<GitHubRepository[]>(`${environment.gitHubApi}/users/` + username + '/repos')
      .pipe(
        map((data) => {
          return data;
        }),
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          console.log(`${outcome} GitHub username=${username}`);
        }),
        catchError(this.handleError<GitHubRepository[]>(`getRepos username=${username}`)),
      );
  }

  /**
   * Returns a function that handles Http operation failures.
   * This error handler lets the app continue to run as if no error occurred.
   *
   * @param operation - name of the operation that failed
   */
  private handleError<T>(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(error);
      const message = (error.error instanceof ErrorEvent) ?
        error.error.message : `server returned code ${error.status} with body "${error.error}"`;
      throw new Error(`${operation} failed: ${message}`);
    };
  }
}
