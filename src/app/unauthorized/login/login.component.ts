import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})
export class LoginComponent {
    loginForm: FormGroup = this.fb.group(
        {
            email: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required, Validators.minLength(6)]]
        }
    );

    constructor(private fb: FormBuilder,
                private router: Router,
                private authService: AuthService) {
    }

    public submit(): void {
        this.authService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value);
    }
}
