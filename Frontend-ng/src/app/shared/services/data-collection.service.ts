import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

const routes = {
    simulateCode: () => `/create_code`,
    startEvent: () => `/start_event`,
    finishEvent: () => `/finish_event`,
};

@Injectable({
    providedIn: 'root'
})
export class DataCollectionService {

    constructor(private apiService: ApiService) {
    }

    simulateCode(responseCode: number): Observable<void> {
        return this.apiService.post(routes.simulateCode(), {code: responseCode});
    }

    startEvent(site: string): Observable<any> {
        return this.apiService.post(routes.startEvent(), {site: site});
    }

    finishEvent(eventId: number): Observable<void> {
        return this.apiService.post(routes.finishEvent(), {event_id: eventId});
    }
}
