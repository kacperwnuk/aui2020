import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

const routes = {
    hello: () => `/hello`,
};

@Injectable({
    providedIn: 'root'
})
export class DummyTestService {

    constructor(private apiService: ApiService) {
    }

    hello(): Observable<void> {
        return this.apiService.get(routes.hello(), {}, {});
    }
}
