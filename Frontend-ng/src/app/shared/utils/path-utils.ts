import { HttpParams } from '@angular/common/http';
import { PageableParams } from '../models/api';

export class PathUtils {

  public static appendPageableParams(urlSearchParams: HttpParams, pageableParams?: PageableParams): HttpParams {
    if (typeof pageableParams !== 'undefined') {
      if (pageableParams.sort) {
        urlSearchParams = urlSearchParams.append('sort', `${pageableParams.sort.order},${pageableParams.sort.direction}`);
      }

      const pageableParamsSource: any = pageableParams;
      ['page', 'size'].forEach(key => {

        if (pageableParamsSource.hasOwnProperty(key)) {
          urlSearchParams = urlSearchParams.append(key, `${pageableParamsSource[key]}`);
        }
      });
    }

    return urlSearchParams;
  }

  public static appendFilterParams(urlSearchParams: HttpParams, filterParams?: any): HttpParams {
    if (typeof filterParams !== 'undefined') {
      Object.keys(filterParams).map(key => {
        const value = filterParams[key];
        if (null != value && '' !== value) {
          urlSearchParams = urlSearchParams.append(key, `${value}`);
        }
      });
    }

    return urlSearchParams;
  }

  public static normalizeQueryParams(filterParams: any): string {
    return this.appendFilterParams(new HttpParams(), filterParams).toString();
  }

}
