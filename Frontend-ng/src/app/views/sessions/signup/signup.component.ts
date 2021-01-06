import { Component, OnInit } from '@angular/core';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  animations: [SharedAnimations]
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private notification: ToastrService,
              private router: Router) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

    login() {
      this.router.navigateByUrl('/sessions/signin');
    }

  signUp() {
    this.auth.signUp(this.signUpForm.value)
        .subscribe(res => {
          this.router.navigateByUrl('/sessions/signin');
          this.notification.success('Zarejestrowano pomyślnie', 'Sukces', {timeOut: 2500, closeButton: true, progressBar: true});
        }, error => {
          this.notification.error('Podany email juz istnieje', 'Błąd rejestracji', {timeOut: 2500, closeButton: true, progressBar: true});
        });
  }
}
