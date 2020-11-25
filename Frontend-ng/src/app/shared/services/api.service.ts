import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiError, PageableParams } from '../models/api.model';
import { PathUtils } from '../utils/path-utils';

const BASE_URL = env.serverUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) {
  }

  public get(path: string, pageableParams?: PageableParams, filterParams?: any): Observable<any> {
    return this.httpClient.get(BASE_URL + path, this.getRequestOptions(pageableParams, filterParams))
      .pipe(catchError(this.formatErrors));
  }

  public put(path: string, body: object = {}): Observable<any> {
    return this.httpClient
      .put(BASE_URL + path, JSON.stringify(body), this.getRequestOptions())
      .pipe(catchError(this.formatErrors));
  }

  public patch(path: string, body: object = {}): Observable<any> {
    return this.httpClient
      .patch(BASE_URL + path, JSON.stringify(body), this.getRequestOptions())
      .pipe(catchError(this.formatErrors));
  }

  public post(path: string, body: object = {}): Observable<any> {
    return this.httpClient
      .post(BASE_URL + path, JSON.stringify(body), this.getRequestOptions())
      .pipe(catchError(this.formatErrors));
  }

  public delete(path: string): Observable<any> {
    return this.httpClient.delete(BASE_URL + path, this.getRequestOptions()).pipe(catchError(this.formatErrors));
  }

  private formatErrors(error: HttpErrorResponse): Observable<ApiError> {
    return throwError(new ApiError(error));
  }

  private getRequestOptions(pageableParams?: PageableParams, filterParams?: any) {
    let urlSearchParams: HttpParams = new HttpParams();

    urlSearchParams = PathUtils.appendPageableParams(urlSearchParams, pageableParams);
    urlSearchParams = PathUtils.appendFilterParams(urlSearchParams, filterParams);

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return {
      params: urlSearchParams,
      headers: headers
    };

  }
}
