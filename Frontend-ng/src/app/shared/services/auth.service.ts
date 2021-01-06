import { Injectable } from '@angular/core';
import { LocalStoreService } from './local-store.service';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { tap } from 'rxjs/operators';
import { User } from '../models/api.model';

const routes = {
    register: () => `/register`,
    login: () => `/login`,
    disconnect: () => `/disconnect`
};

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private store: LocalStoreService, private router: Router, private apiService: ApiService) {
    }

    getToken() {
        const token = localStorage.getItem('ACCESS_TOKEN');
        return token ? token : undefined;
    }

    signIn(credentials: any) {
        return this.apiService.post(routes.login(), {email: credentials.email, password: credentials.password}, false)
            .pipe(
                tap(response => localStorage.setItem('ACCESS_TOKEN', response.response.user.authentication_token)));
    }

    signOut() {
        localStorage.removeItem('ACCESS_TOKEN');
        this.router.navigateByUrl('/sessions/signin');
    }

    signUp(credentials: any) {
        return this.apiService.post(routes.register(), {email: credentials.email, password: credentials.password}, false);
    }
}
