import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { ProfileService } from '../../../core/services/profile.service';
import { IUser } from '../../../core/interfaces/user';
import {Errors} from '../../../core/enums/errors';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit{
    errors = Errors;
    profileForm = {} as FormGroup;

    private UrlCheck = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    private PhoneCheck = '^[0-9]{10}$';

    constructor(private formBuilder: FormBuilder,
                private profileService: ProfileService) {}

    ngOnInit() {
        this.profileForm = this.formBuilder.group({
            firstName: [null, [Validators.required, Validators.maxLength(255), Validators.minLength(2)]],
            lastName: [null, [Validators.required, Validators.maxLength(255), Validators.minLength(2)]],
            email: [null, [Validators.required, Validators.email]],
            phone: [ null, [Validators.required, Validators.pattern(this.PhoneCheck)]],
            url: [null, [Validators.pattern(this.UrlCheck)]],
        });

        this.profileService.getCurrentUser().subscribe((user: IUser) => {
            this.profileForm.get('firstName')?.setValue(user.firstName);
            this.profileForm.get('lastName')?.setValue(user.lastName);
            this.profileForm.get('email')?.setValue(user.email);
            this.profileForm.get('phone')?.setValue(`${user.phone?.slice(2)}`);
            this.profileForm.get('url')?.setValue(user.url);
        });
    }

    public submit(): void {
        this.profileService.updateUser({...this.profileForm.value,
            phone: `+7${this.profileForm.value.phone}`
        });
        this.profileService.updateIsProfileUpdated(true);
        setTimeout(() => this.profileService.updateIsProfileUpdated(false), 30000);
    }
}
