import { Component, OnInit } from '@angular/core';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router, RouteConfigLoadStart, ResolveStart, RouteConfigLoadEnd, ResolveEnd } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss'],
    animations: [SharedAnimations]
})
export class SigninComponent implements OnInit {
    loading: boolean;
    loadingText: string;
    signinForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private auth: AuthService,
        private router: Router,
        private apiService: ApiService,
        private notification: ToastrService
    ) {
    }

    ngOnInit() {
        this.router.events.subscribe(event => {
            if (event instanceof RouteConfigLoadStart || event instanceof ResolveStart) {
                this.loadingText = 'Loading Dashboard Module...';

                this.loading = true;
            }
            if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
                this.loading = false;
            }
        });

        this.signinForm = this.fb.group({
            email: ['test@example.com', Validators.required],
            password: ['1234', Validators.required]
        });
    }

    signin() {
        this.loading = true;
        this.loadingText = 'Logowanie...';
        this.auth.signIn(this.signinForm.value)
            .subscribe(res => {
                this.router.navigateByUrl('/dashboard/v1');
                this.loading = false;
                this.notification.success('Zalogowano pomyślnie', 'Sukces', {timeOut: 2500, closeButton: true, progressBar: true});
            }, error => {
                this.loading = false;
                this.notification.error('Błędne dane', 'Błąd logowania', {timeOut: 2500, closeButton: true, progressBar: true});
            });
    }

    register() {
        this.router.navigateByUrl('/sessions/signup');
    }
}
