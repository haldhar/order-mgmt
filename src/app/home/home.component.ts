import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/models';
import { Product } from '@app/models';
import { Order } from '@app/models';
import { MainService, AuthenticationService } from '@app/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    users: User[];
    products: Product[];
    orders: Order[];

    constructor(private mainService: MainService, private router: Router, private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.loading = true;
        this.mainService.getAllProduct().pipe(first()).subscribe(products => {
            this.products = products;
        });

        this.mainService.getAllOrder().pipe(first()).subscribe(orders => {
            this.loading = false;
            this.orders = orders;
        });
    }

    placeOrder() {
        this.router.navigateByUrl('/order');
    }
}