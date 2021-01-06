import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiError, PageableParams } from '../models/api.model';
import { PathUtils } from '../utils/path-utils';
import { AuthService } from './auth.service';

const BASE_URL = env.serverUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) {
  }

  public get(path: string, pageableParams?: PageableParams, filterParams?: any, withAuth: boolean = true): Observable<any> {
    return this.httpClient.get(BASE_URL + path, this.getRequestOptions(withAuth, pageableParams, filterParams))
      .pipe(catchError(this.formatErrors));
  }

  public put(path: string, body: object = {}, withAuth: boolean = true): Observable<any> {
    return this.httpClient
      .put(BASE_URL + path, JSON.stringify(body), this.getRequestOptions(withAuth))
      .pipe(catchError(this.formatErrors));
  }

  public patch(path: string, body: object = {}, withAuth: boolean = true): Observable<any> {
    return this.httpClient
      .patch(BASE_URL + path, JSON.stringify(body), this.getRequestOptions(withAuth))
      .pipe(catchError(this.formatErrors));
  }

  public post(path: string, body: object = {}, withAuth: boolean = true): Observable<any> {
    return this.httpClient
      .post(BASE_URL + path, JSON.stringify(body), this.getRequestOptions(withAuth))
      .pipe(catchError(this.formatErrors));
  }

  public delete(path: string, withAuth: boolean = true): Observable<any> {
    return this.httpClient.delete(BASE_URL + path, this.getRequestOptions(withAuth)).pipe(catchError(this.formatErrors));
  }

  private formatErrors(error: HttpErrorResponse): Observable<ApiError> {
    return throwError(new ApiError(error));
  }

  private getRequestOptions(withAuth: boolean, pageableParams?: PageableParams, filterParams?: any) {
    let urlSearchParams: HttpParams = new HttpParams();

    urlSearchParams = PathUtils.appendPageableParams(urlSearchParams, pageableParams);
    urlSearchParams = PathUtils.appendFilterParams(urlSearchParams, filterParams);

    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    if (withAuth) {
      const token = localStorage.getItem('ACCESS_TOKEN');
      if (token) {
        headers = headers.append('authentication_token', token);
      }
    }

    return {
      params: urlSearchParams,
      headers: headers
    };

  }
}
