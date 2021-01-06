import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

const routes = {
    simulateCode: () => `/?`,
    countTime: () => `/?`,
};

@Injectable({
    providedIn: 'root'
})
export class DataCollectionService {

    constructor(private apiService: ApiService) {
    }

    simulateCode(responseCode: string): Observable<void> {
        return this.apiService.post(routes.simulateCode(), {});
    }

    countTime(timeInSeconds: number): Observable<void> {
        return this.apiService.post(routes.countTime(), {});
    }
}
