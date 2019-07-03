﻿import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';
import { NavComponent } from '../nav/nav.component';

import { LoginViewModel } from '../../../models/LoginViewModel'
import { AuthenticationScheme } from '../../../models/AuthenticationScheme'

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    providers: [NavComponent]
})
export class LoginComponent implements OnInit {
    submitted = false;
    returnUrl: string = '#';
    externalLogins: AuthenticationScheme[];
    errorMessage: string = '';

    loginForm: FormGroup;

    private subscription: Subscription;

    constructor(private dataService: DataService, private formBuilder: FormBuilder, private router: Router, activeRoute: ActivatedRoute, private nav: NavComponent) {
        this.subscription = activeRoute.queryParams.subscribe(
            (queryParam: any) => {
                if (queryParam['returnUrl'] != undefined) {
                    this.returnUrl = queryParam['returnUrl'];
                }
            }
        );
    }

    ngOnInit() {
        this.loginGet();

        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required]],
            password: ['', [Validators.required]],
            rememberMe: [false]
        });
    }

    get f() { return this.loginForm.controls; }

    loginGet() {
        this.dataService.loginGet(this.returnUrl)
            .subscribe((data: LoginViewModel) => {
                this.returnUrl = data.returnUrl;
                this.externalLogins = data.externalLogins;
            });
    }

    loginPost() {
        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }

        this.dataService.loginPost(this.loginForm.value)
            .subscribe((data: LoginViewModel) => {
                this.returnUrl = data.returnUrl
                this.errorMessage = data.errorMessage;
                this.nav.getUsersInfo();
                if (this.errorMessage == "") {
                    this.router.navigate([this.returnUrl]);
                }
            },
            (err: any) => this.router.navigate(['/Account/Login']));
    }

    externalLogin(provider: string) {
        this.dataService.externalLogin(provider, this.returnUrl);
    }
}